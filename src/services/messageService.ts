import { StatusCodes } from 'http-status-codes'
import models from '../db/models'
import { CustomErrorHandler } from '../utils/ErrorHandling'
import { MessageInput, ReplyMessageInput } from '../types/message.type'
import { CreateGroupMessageInput } from '../types/groupMessage.type'
import { CreateMemberGroupInput } from '../types/memberGroup.type'
import { Op } from 'sequelize'
import { ReactMessageInput, UpdateReactMessageInput } from '../types/reactMessage.type'
import userService from './userService'

class messageService {
  async getConversation(userLoggin: string) {
    // Fetch MemberGroup data for the logged-in user
    const MemberGroupData = await models.MemberGroup.findAll({ where: { user_id: userLoggin } })

    // Extract group message IDs from MemberGroupData
    const groupMessageIds = MemberGroupData.map((item) => item.group_message_id)

    // Fetch relevant GroupMessage data
    const GroupMessageData = await models.GroupMessage.findAll({
      where: { group_message_id: groupMessageIds }
    })

    // Fetch all MemberGroup and Message data
    const [AllMemberGroup, MessageData] = await Promise.all([
      models.MemberGroup.findAll(),
      models.Message.findAll({ order: [['createdAt', 'DESC']] })
    ])

    // Helper function to get user name
    const getUserName = async (groupMessageId: string) => {
      const data = AllMemberGroup.filter((member) => member.group_message_id === groupMessageId)
      const userFilter = data.find((item) => item.user_id !== userLoggin)

      if (userFilter) {
        const user = await models.User.findOne({
          where: { user_id: userFilter.user_id }
        })
        return user ? `${user.first_name} ${user.last_name}` : ''
      }
      return ''
    }
    // Hepler function to get thubmail
    const getThubmail = async (groupMessageId: string) => {
      const data = AllMemberGroup.filter((member) => member.group_message_id === groupMessageId)
      const userFilter = data.find((item) => item.user_id !== userLoggin)
      const user = await models.Profile.findOne({
        where: { user_id: userFilter?.user_id }
      })
      return user ? user.profile_picture : ''
    }

    // Create group messages with messages
    const data = await Promise.all(
      GroupMessageData.map(async (groupMessage) => {
        const messages = MessageData.filter((message) => message.group_message_id === groupMessage.group_message_id)

        if (groupMessage.type === 1) {
          const groupName = await getUserName(groupMessage.group_message_id)
          const thubmail = await getThubmail(groupMessage.group_message_id)
          return {
            ...groupMessage.get({ plain: true }),
            group_name: groupName,
            group_thumbnail: thubmail,
            messages: messages[0]
          }
        }

        return { ...groupMessage.get({ plain: true }), messages: messages[0] }
      })
    )

    return {
      message: 'lấy thông tin conversation ok',
      data
    }
  }

  async deteleConversation(id: string) {
    const checkGroup = await models.GroupMessage.findByPk(id)
    if (!checkGroup) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại group!')
    }

    await models.GroupMessage.destroy({
      where: { group_message_id: id }
    })

    return {
      message: 'Xóa group thành công!',
      data: {}
    }
  }

  async createGroup(createGroupData: CreateGroupMessageInput, userLoggin: string) {
    const users = JSON.parse(createGroupData.list_user)
    const countUser = [userLoggin, ...users]
    let group_name = createGroupData.group_name
    let group_thumbnail = createGroupData.group_thumbnail
      ? createGroupData.group_thumbnail
      : 'https://res.zaloapp.com/pc/avt_group/8_friends.jpg'

    // Kiểm tra số lượng thành viên tối thiểu
    if (countUser.length < 3) {
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Cần tối thiểu 3 người để tạo nhóm')
    }

    // Xác thực người dùng trong danh sách
    const newMembers = await Promise.all(users.map(async (user: string) => await models.User.findByPk(user)))
    const emptyMembers = newMembers.some((member) => member === null)

    if (emptyMembers) {
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Một hoặc nhiều người dùng không tồn tại')
    }

    // Tạo tên nhóm nếu chưa có
    if (!group_name) {
      const userPromises = countUser.map(async (userId) => await models.User.findByPk(userId))
      const usersData = await Promise.all(userPromises)
      group_name = usersData.map((user: any) => `${user.first_name} ${user.last_name}`).join(', ')
    }

    // Tạo dữ liệu nhóm
    const dataGroupName = {
      group_name,
      group_thumbnail,
      status: true,
      type: 2,
      createdBy: userLoggin
    }

    // Tạo nhóm mới
    const newGroup = await models.GroupMessage.create(dataGroupName)

    // Thêm thành viên vào nhóm
    await Promise.all(
      countUser.map(async (user_id: string) => {
        await models.MemberGroup.create({
          user_id: user_id,
          group_message_id: newGroup.group_message_id,
          role: user_id === userLoggin ? true : false
        })
      })
    )

    return {
      message: 'Tạo nhóm thành công',
      data: {
        newGroup
      }
    }
  }

  async addMembersToGroup(memberGroupData: CreateMemberGroupInput) {
    const users = JSON.parse(memberGroupData.listUser)
    const checkGroup = await models.GroupMessage.findByPk(memberGroupData.group_message_id)

    if (!checkGroup) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Group not found!')
    }

    const existingMembers = await models.MemberGroup.findAll({
      where: {
        group_message_id: memberGroupData.group_message_id
      }
    })
    const newMembers = users.filter((user: any) => !existingMembers.some((member) => member.user_id === user))
    if (newMembers.length === 0) {
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'All members already exist!')
    }

    await Promise.all(
      newMembers.map(async (user: any) => {
        const checkUser = await models.MemberGroup.findOne({
          where: {
            user_id: {
              [Op.eq]: user
            }
          }
        })
        if (checkUser) {
          throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, `User ${user} already exists!`)
        }
        await models.MemberGroup.create({
          user_id: user,
          group_message_id: memberGroupData.group_message_id,
          role: false
        })
      })
    )

    return {
      message: 'Thêm thành viên thành công',
      data: {}
    }
  }

  async getMessage(id: string) {
    const checkGroup = await models.GroupMessage.findByPk(id)

    if (!checkGroup) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Group message not found!')
    }

    const messages = await models.Message.findAll({
      where: {
        group_message_id: id
      },
      order: [['createdAt', 'ASC']]
    })

    const reactData = await models.ReactMessage.findAll()

    const getReplyMessages = (messages: any, parent_id: any) => {
      return messages.find((message: any) => message.message_id === parent_id)
    }

    const getThubmail = async (user_id: string) => {
      const profile = await models.Profile.findOne({
        where: {
          user_id: user_id
        }
      })

      return profile?.profile_picture
    }

    const data = await Promise.all(
      messages.map(async (message) => {
        const reactions = reactData.filter((react) => react.message_id === message.message_id)
        const replyMessage = getReplyMessages(messages, message.parent_id)
        const thumbnail = await getThubmail(message.createdBy)
        const replyMessageData = {
          body: replyMessage?.body,
          createdBy: replyMessage?.createdBy,
          type: replyMessage?.type
        }
        return {
          ...message.get({ plain: true }),
          reactions,
          thumbnail,
          replyMessage: replyMessageData
        }
      })
    )

    return {
      message: 'lấy thông tin messsage ok',
      data
    }
  }

  async sendMessage(messageData: MessageInput, sender: string) {
    const checkGroup = await models.GroupMessage.findByPk(messageData.group_message_id)
    if (checkGroup) {
      const data = { ...messageData, createdBy: sender }
      await models.Message.create(data)
    } else {
      const newGroupMessage = await models.GroupMessage.create({
        status: true,
        type: 1,
        createdBy: sender
      })
      const newGroupMessageId = newGroupMessage.group_message_id
      if (!messageData.receiver) {
        throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Không tìm thấy người nhận')
      }
      await models.MemberGroup.bulkCreate([
        { user_id: sender, status: true, group_message_id: newGroupMessageId },
        { user_id: messageData.receiver, status: true, group_message_id: newGroupMessageId }
      ])

      const newMessageData = {
        ...messageData,
        createdBy: sender,
        group_message_id: newGroupMessageId
      }
      await models.Message.create(newMessageData)
    }

    return {
      message: 'Gửi tin nhắn thành công!',
      data: {
        messageData
      }
    }
  }

  async replyMessage(replyMessageInput: ReplyMessageInput, userLoggin: string) {
    const data = {
      ...replyMessageInput,
      createdBy: userLoggin
    }

    await models.Message.create(data)
    return {
      message: 'Gửi tin nhán này',
      data: {
        data
      }
    }
  }

  async deleteMessageFromOthers(message_id: string, userLoggin: string) {
    const message = await models.Message.findByPk(message_id)

    if (!message) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, ' message not found!')
    }

    // Nếu tin nhắn không phải do người dùng gửi: go o phia toi
    const data = await message.update({ status: false, detelectedBy: userLoggin, detelectedAt: new Date() })

    return {
      message: 'deleteMessageFromOthers ok',
      data: {
        data
      }
    }
  }

  async deleteMessageFromMe(messsageId: string, userLoggin: string) {
    const message = await models.Message.findByPk(messsageId)

    if (!message) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'message not found!')
    }

    if (message.createdBy !== userLoggin) {
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'ko co quyen xoa tin nhan')
    } else {
      // Thu hoi tin da gui ( xoa luon )
      await message.update({ status: true, detelectedBy: userLoggin, detelectedAt: new Date() })
    }

    return {
      message: 'deleteMessageFromMe ok',
      data: {}
    }
  }

  async sendReactMessage(reactMessageData: ReactMessageInput) {
    const checkMessage = await models.Message.findByPk(reactMessageData.message_id)
    if (!checkMessage) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại message!')
    }
    const checkReactMessage = await models.ReactMessage.findOne({
      where: {
        message_id: reactMessageData.message_id,
        user_id: reactMessageData.user_id
      }
    })

    if (checkReactMessage) {
      if (checkReactMessage.emoji === reactMessageData.emoji) {
        // delete
        await models.ReactMessage.destroy({
          where: {
            react_message_id: checkReactMessage.react_message_id
          }
        })
        return {
          message: 'delete ReactMessage ok',
          data: {}
        }
      } else {
        const data = {
          ...checkReactMessage,
          emoji: reactMessageData.emoji,
          updatedAt: new Date()
        }

        await models.ReactMessage.update(data, {
          where: {
            react_message_id: checkReactMessage.react_message_id
          }
        })

        return {
          message: 'update ReactMessage ok',
          data: {}
        }
      }
    }

    await models.ReactMessage.create(reactMessageData)

    return {
      message: 'sendReactMessage ok',
      data: {}
    }
  }
}
// refactor reactMessage
export default new messageService()
