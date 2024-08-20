import { StatusCodes } from 'http-status-codes'
import { Model, Op, Sequelize } from 'sequelize'
import models from '../db/models'
import Message, { MessageAttributes } from '../db/models/Message'
import { CreateGroupMessageInput } from '../types/groupMessage.type'
import { CreateMemberGroupInput } from '../types/memberGroup.type'
import { MessageInput, MessageMediaInput, ReplyMessageInput } from '../types/message.type'
import { ReactMessageInput } from '../types/reactMessage.type'
import { CustomErrorHandler } from '../utils/ErrorHandling'
import messageSocketService from './messageSocketService'
import notifyMessageService from './notifyMessageService'
import userService from './userService'
import deleteConversationService from './deleteConversationService'
import seenMessageService from './seenMessageService'
import MemberGroup from '../db/models/MemberGroup'
import { User } from '../types/user.type'

class messageService {
  private async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  // hàm lấy hình ảnh người dùng
  async getThubmail(user_id: string | undefined) {
    const profile = await models.Profile.findOne({
      where: {
        user_id: user_id
      }
    })

    return profile?.profile_picture
  }
  // hàm lấy tên người dùng
  async getFullName(user_id: string | undefined) {
    const user = await models.User.findOne({
      where: {
        user_id: user_id
      }
    })
    return `${user?.last_name} ${user?.first_name}`
  }

  // hàm lấy đoạn chat
  async getConversation(userLoggin: string, page: number, limit: number, search?: boolean) {
    // danh sách chặn người dùng
    const listBlockUser = await userService.fetchAllListBlockUser(userLoggin)
    const listBlockUserArr = listBlockUser.data.friends as User[]
    const listBlockUserId = listBlockUserArr.map((user) => user.user_id)
    // danh sách người dùng bị chặn
    const listBlockedUser = await userService.fetchAllListBlockedUser(userLoggin)
    // lấy MemberGroup data từ loggin user
    const MemberGroupData = await models.MemberGroup.findAll({ where: { user_id: userLoggin } })

    // groupMessageIds
    const groupMessageIds = MemberGroupData.map((item) => item.group_message_id)

    // điều kiện lọc
    let whereConditions
    // tìm kiếm đoạn chat thì lấy tất cả
    if (search) {
      whereConditions = {
        deletedBy: userLoggin
      }
      // lấy đoạn chat với deletedBy
    } else {
      whereConditions = {
        deletedBy: userLoggin,
        status: true
      }
    }

    const groupMessageIdsNodelete = await models.DeleteGroupMessage.findAll({
      where: whereConditions
    })

    const filteredGroupMessageIds = groupMessageIds.filter((item1: string) => {
      return search ? [...item1] : !groupMessageIdsNodelete.some((item2) => item1 === item2.group_message_id)
    })

    // Fetch GroupMessage
    const offset = (page - 1) * limit

    const groupMessages = await models.GroupMessage.findAndCountAll({
      where: { group_message_id: filteredGroupMessageIds },
      order: [['updatedAt', 'DESC']],
      offset,
      limit
    })

    const totalPage = Math.ceil(groupMessages.count / limit)
    // Fetch all MemberGroup and Message data
    const [AllMemberGroup, MessageData] = await Promise.all([
      models.MemberGroup.findAll(),
      models.Message.findAll({ order: [['createdAt', 'DESC']] })
    ])

    // hàm lấy tên đoạn chat
    const getUserName = async (groupMessageId: string) => {
      const data = AllMemberGroup.filter((member) => member.group_message_id === groupMessageId)
      const userFilter = data.find((item) => item.user_id !== userLoggin)

      if (userFilter) {
        return this.getFullName(userFilter.user_id)
      }
      return ''
    }
    // get id
    const getUserId = async (groupMessageId: string) => {
      const data = AllMemberGroup.filter((member) => member.group_message_id === groupMessageId)
      const userFilter = data.find((item) => item.user_id !== userLoggin)

      if (userFilter) {
        const user = await models.User.findOne({
          where: { user_id: userFilter.user_id }
        })
        return user?.user_id
      }
      return ''
    }
    // Hàm lấy thubmail đoạn chat
    const getThubmailConversation = async (groupMessageId: string) => {
      const data = AllMemberGroup.filter((member) => member.group_message_id === groupMessageId)
      const userFilter = data.find((item) => item.user_id !== userLoggin)
      const user = await models.Profile.findOne({
        where: { user_id: userFilter?.user_id }
      })
      return user ? user.profile_picture : ''
    }

    // lấy tin nhắn
    const data = await Promise.all(
      groupMessages.rows.map(async (groupMessage) => {
        // const messages = MessageData.filter((message) => message.group_message_id === groupMessage.group_message_id)
        const messages = await this.getMessage(groupMessage.group_message_id, 1, 1, userLoggin)
        const messageStatusTrue = messages.data.filter((m) => m.status === true && m.is_report === false)
        const message = messageStatusTrue[messageStatusTrue.length - 1]
        const filterMessage = {
          message_id: message?.message_id,
          body: message?.body,
          sub_body: message?.sub_body,
          status: message?.status,
          type: message?.type,
          group_message_id: message?.group_message_id,
          reactions: message?.reactions,
          user_name: message?.user_name,
          createdAt: message?.createdAt,
          updatedAt: message?.updatedAt
        }
        if (groupMessage.type === 1) {
          const groupName = await getUserName(groupMessage.group_message_id)
          const thubmail = await getThubmailConversation(groupMessage.group_message_id)
          const user_id = await getUserId(groupMessage.group_message_id)
          return {
            ...groupMessage.get({ plain: true }),
            group_name: groupName,
            group_thumbnail: thubmail,
            user_id: user_id,
            list_block_user: listBlockUserId,
            list_blocked_user: listBlockedUser.data.friends,
            messages: filterMessage
          }
        }

        return {
          ...groupMessage.get({ plain: true }),
          list_block_user: listBlockUserId,
          list_blocked_user: listBlockedUser.data.friends,
          messages: filterMessage
        }
      })
    )

    return {
      message: 'lấy thông tin conversation ok',
      data: {
        data,
        pagination: {
          totalPage,
          page: page,
          limit: limit
        }
      }
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
    const users: string[] = JSON.parse(createGroupData.list_user)
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
    const newMembers = await models.User.findAll({
      where: {
        user_id: users
      }
    })
    const emptyMembers = newMembers.some((member) => member === null)

    if (emptyMembers) {
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Một hoặc nhiều người dùng không tồn tại')
    }

    // Tạo tên nhóm nếu chưa có ( lấy tên user cộng lại)
    if (!group_name) {
      const usersData = await models.User.findAll({
        where: {
          user_id: countUser
        }
      })
      group_name = usersData
        .slice(0, 3)
        .map((user) => `${user.first_name} ${user.last_name}`)
        .join(', ')
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
    // ------bắn thông báo trong message------ //
    const user_login = await this.getFullName(userLoggin)
    const dataMessageTypeZero = {
      createdBy: userLoggin,
      type: 0,
      group_message_id: newGroup.group_message_id,
      body: `${user_login} đã tạo nhóm.`,
      receiver: newGroup.group_message_id,
      is_report: false,
      report_count: 0
    }
    await this.sendMessage(dataMessageTypeZero, userLoggin)

    await this.delay(1000)
    // Chuẩn bị dữ liệu thêm thành viên
    const memberData = countUser.map((user_id) => ({
      user_id,
      group_message_id: newGroup.group_message_id,
      role: user_id === userLoggin
    }))

    // Thêm thành viên vào nhóm
    await models.MemberGroup.bulkCreate(memberData)

    // Tạo thông báo cho các thành viên mới (ngoại trừ người tạo nhóm)
    const messages = newMembers
      .filter((user) => user.user_id !== userLoggin)
      .map((user) => ({
        createdBy: userLoggin,
        type: 0,
        group_message_id: newGroup.group_message_id,
        body: `${user.first_name} ${user.last_name} đã được thêm vào nhóm.`,
        receiver: newGroup.group_message_id,
        is_report: false,
        report_count: 0
      }))

    await Promise.all(messages.map((message) => this.sendMessage(message, message.receiver)))

    // ========= //

    return {
      message: 'Tạo nhóm thành công',
      data: {
        newGroup
      }
    }
  }

  async addMembersToGroup(memberGroupData: CreateMemberGroupInput) {
    const users: string[] = JSON.parse(memberGroupData.list_user)
    const checkGroup = await models.GroupMessage.findByPk(memberGroupData.group_message_id)

    if (!checkGroup) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Group not found!')
    }

    const existingMembers = await models.MemberGroup.findAll({
      where: {
        group_message_id: memberGroupData.group_message_id
      }
    })

    const newMembers = users.filter((user: string) => !existingMembers.some((member) => member.user_id === user))
    if (newMembers.length === 0) {
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Người dùng đã tồn tại trong đoạn chat!')
    }

    await Promise.all(
      newMembers.map(async (user: string) => {
        const checkUser = await models.MemberGroup.findOne({
          where: {
            user_id: {
              [Op.eq]: user
            },
            group_message_id: memberGroupData.group_message_id
          }
        })
        if (checkUser) {
          throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, `Người dùng đã tồn tại trong đoạn chat!`)
        }
        const createDone = await models.MemberGroup.create({
          user_id: user,
          group_message_id: memberGroupData.group_message_id,
          role: false
        })
        const user_name = await this.getFullName(user)
        const dataMessageTypeZero = {
          createdBy: user,
          type: 0,
          group_message_id: memberGroupData.group_message_id,
          body: `${user_name} đã được thêm vào nhóm`,
          receiver: memberGroupData.group_message_id,
          is_report: false,
          report_count: 0
        }
        createDone && (await this.sendMessage(dataMessageTypeZero, user))
        await messageSocketService.emitCurdMemberGroup(memberGroupData.group_message_id)
      })
    )

    // cập nhật lại deteleGroup
    await Promise.all(
      users.map(async (user: string) => {
        const checkUser = await models.DeleteGroupMessage.findOne({
          where: {
            group_message_id: memberGroupData.group_message_id,
            deletedBy: user
          }
        })
        if (checkUser) {
          await deleteConversationService.updateDeleteConversation(checkUser.delete_group_message_id)
        }
      })
    )

    return {
      message: 'Thêm thành viên thành công',
      data: {}
    }
  }

  async getMembersGroup(id: string, userLoggin: string) {
    const checkGroup = await models.GroupMessage.findByPk(id)

    // danh sách chặn người dùng
    const listBlockUser = await userService.fetchAllListBlockUser(userLoggin)
    const listBlockUserArr = listBlockUser.data.friends as User[]
    const listBlockUserId = listBlockUserArr.map((user) => user.user_id)
    // danh sách người dùng bị chặn
    const listBlockedUser = await userService.fetchAllListBlockedUser(userLoggin)
    //
    if (!checkGroup) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Group message không tồn tại')
    }

    const checkMember = await models.MemberGroup.findOne({
      where: {
        group_message_id: id,
        user_id: userLoggin
      }
    })

    if (!checkMember) {
      throw new CustomErrorHandler(StatusCodes.FORBIDDEN, 'Bạn không phải là thành viên nhóm')
    }

    const dataMembers = await models.MemberGroup.findAll({
      where: {
        group_message_id: id
      }
    })

    const data = await Promise.all(
      dataMembers.map(async (member) => {
        const group = await models.GroupMessage.findOne({
          where: {
            type: 1
          },
          include: [
            {
              model: models.MemberGroup,
              where: {
                [Op.and]: [{ user_id: member.user_id }, { user_id: { [Op.ne]: userLoggin } }]
              }
            }
          ]
        })

        const avatar = await this.getThubmail(member.user_id)
        const fullname = await this.getFullName(member.user_id)
        return {
          user_id: member.user_id,
          role: member.role,
          avatar,
          fullname,
          group_message_id: group?.group_message_id,
          list_block_user: listBlockUserId,
          list_blocked_user: listBlockedUser.data.friends
        }
      })
    )

    return {
      message: 'lấy member group ok',
      data
    }
  }

  async getMessage(id: string, page?: number, limit?: number, sender?: string) {
    const checkGroup = await models.GroupMessage.findByPk(id)

    if (!checkGroup) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Group message not found!')
    }

    // kiểm tra user xóa đoạn chat
    const checkDeleteGroup = await models.DeleteGroupMessage.findOne({
      where: {
        group_message_id: id,
        deletedBy: sender
      },
      order: [['createdAt', 'DESC']],
      limit: 1
    })

    const whereConditions: any = {
      group_message_id: id
    }
    if (checkDeleteGroup) {
      whereConditions.createdAt = { [Op.gt]: checkDeleteGroup.deletedAt }
    }

    let messages: Message[] = []
    let totalPage
    if (page && limit) {
      const offset = (page - 1) * limit
      const tepm = await models.Message.findAndCountAll({
        where: whereConditions,
        order: [['createdAt', 'DESC']],
        offset,
        limit
      })
      messages = tepm.rows
      totalPage = Math.ceil(tepm.count / limit)
    } else {
      messages = await models.Message.findAll({
        where: whereConditions,
        order: [['createdAt', 'DESC']]
      })
    }

    const tempMesssages = [...messages]
    const reversedMessages = tempMesssages.reverse()
    const reactData = await models.ReactMessage.findAll()
    const recallData = await models.RecallMessage.findAll()

    const getReplyMessages = async (parent_id: string) => {
      const dataGetReply = await models.Message.findAll({
        where: whereConditions,
        order: [['createdAt', 'DESC']]
      })
      return dataGetReply.find((message: MessageAttributes) => message.message_id === parent_id)
    }

    const data = await Promise.all(
      reversedMessages.map(async (message) => {
        const reactions = reactData.filter((react) => react.message_id === message.message_id)
        const recalls = recallData.filter((recall) => recall.message_id === message.message_id)
        const replyMessage = message.parent_id && (await getReplyMessages(message.parent_id))
        const recallInReply =
          replyMessage && recallData.filter((recall) => recall.message_id === replyMessage?.message_id)
        const thumbnail = await this.getThubmail(message.createdBy)
        const user = await models.User.findOne({
          where: {
            user_id: message.createdBy
          }
        })
        const user_name = `${user?.first_name} ${user?.last_name}`
        let reply_user = ''

        if (replyMessage) {
          const userOld = await models.User.findOne({
            where: {
              user_id: replyMessage?.createdBy
            }
          })
          reply_user = `${userOld?.first_name} ${userOld?.last_name}`
        }
        let replyMessageData = {}
        if (replyMessage)
          replyMessageData = {
            body: replyMessage?.body,
            sub_body: replyMessage?.sub_body,
            createdBy: replyMessage?.createdBy,
            type: replyMessage?.type,
            status: replyMessage?.status,
            message_id: replyMessage?.message_id,
            reply_user: reply_user,
            recallInReply
          }
        // const parentMessage = reversedMessages.find((msg) => msg.message_id === message.parent_id)

        // message.parent_id = parentMessage ? message.parent_id : ''
        return {
          ...message.get({ plain: true }),
          reactions,
          recalls,
          thumbnail,
          user_name,
          replyMessage: replyMessageData
        }
      })
    )

    return {
      data,
      pagination: {
        totalPage,
        page: page,
        limit: limit
      }
    }
  }

  async getOneToOneMessage(receiver: string, sender: string, page?: number, limit?: number) {
    // danh sách chặn người dùng
    const listBlockUser = await userService.fetchAllListBlockUser(sender)
    const listBlockUserArr = listBlockUser.data.friends as User[]
    const listBlockUserId = listBlockUserArr.map((user) => user.user_id)
    // danh sách người dùng bị chặn
    const listBlockedUser = await userService.fetchAllListBlockedUser(sender)
    // Lấy tất cả groupId mà receiver tham gia
    const groupsWithReceiver = await models.MemberGroup.findAll({
      where: { user_id: receiver },
      attributes: ['group_message_id']
    })
    // Lấy danh sách groupId từ kết quả của receiver
    const groupIds = groupsWithReceiver.map((group) => group.group_message_id)

    // Tìm các group mà receiver tham gia và nằm trong danh sách groupId của sender
    const commonGroups = await models.MemberGroup.findAll({
      where: {
        user_id: sender,
        group_message_id: groupIds
      },
      attributes: ['group_message_id']
    })

    const filteredGroupIds = await models.GroupMessage.findAll({
      where: {
        group_message_id: commonGroups.map((group) => group.group_message_id),
        type: 1
      },
      attributes: ['group_message_id']
    })

    const groupIdCheck = filteredGroupIds.map((filter) => filter.group_message_id)

    if (groupIdCheck[0]) {
      const messages = await this.getMessage(groupIdCheck[0], page, limit, sender)
      const info = {
        group_id: receiver,
        avatar: await this.getThubmail(receiver),
        group_name: await this.getFullName(receiver),
        list_block_user: listBlockUserId,
        list_blocked_user: listBlockedUser.data.friends
      }
      return {
        message: 'lấy thông tin messsage ok',
        data: {
          info,
          messages: messages.data,
          pagination: messages.pagination
        }
      }
    } else {
      const info = {
        group_id: receiver,
        avatar: await this.getThubmail(receiver),
        group_name: await this.getFullName(receiver)
      }
      return {
        message: 'lấy thông tin messsage ok',
        data: {
          info,
          messages: []
        }
      }
    }
  }

  async getGroupMessage(id: string, sender: string, page?: number, limit?: number) {
    // danh sách chặn người dùng
    const listBlockUser = await userService.fetchAllListBlockUser(sender)
    const listBlockUserArr = listBlockUser.data.friends as User[]
    const listBlockUserId = listBlockUserArr.map((user) => user.user_id)
    // danh sách người dùng bị chặn
    const listBlockedUser = await userService.fetchAllListBlockedUser(sender)
    //
    const checkGroupExists = await models.GroupMessage.findByPk(id)
    // return checkGroupExists
    if (checkGroupExists) {
      if (checkGroupExists?.type === 2) {
        const messages = await this.getMessage(checkGroupExists.group_message_id, page, limit, sender)
        const info = {
          group_id: checkGroupExists.group_message_id,
          avatar: checkGroupExists.group_thumbnail,
          group_name: checkGroupExists.group_name,
          list_block_user: listBlockUserId,
          list_blocked_user: listBlockedUser.data.friends
        }
        return {
          message: 'lấy thông tin messsage ok',
          data: {
            info,
            messages: messages.data,
            pagination: messages.pagination
          }
        }
      } else {
        return {
          message: 'không tồn tại group'
        }
      }
    }
  }

  async getRecallMessage() {
    const data = await models.RecallMessage.findAll()
    return {
      message: 'lấy thông tin recall ok',
      data
    }
  }

  async sendMessage(messageData: MessageInput, sender: string) {
    const groupMessageIds = await models.MemberGroup.findOne({
      attributes: ['group_message_id'], // Chỉ lấy trường group_message_id
      where: {
        [Op.or]: [{ user_id: sender }, { user_id: messageData.receiver }]
      },
      include: [
        {
          model: models.GroupMessage,
          attributes: [],
          required: true,
          where: {
            type: 1 // Thêm điều kiện lọc type ở đây
          }
        }
      ],
      group: ['group_message_id'], // Nhóm theo group_message_id
      having: Sequelize.literal('COUNT(DISTINCT user_id) = 2') // Chỉ lấy group_message_id có đủ 2 user_id khác nhau
    })

    // kiểm tra group_id từ điều kiện, nếu không có thì nhận group_id từ ngườ dùng nhập
    const group_message_id = groupMessageIds?.dataValues.group_message_id
      ? groupMessageIds?.dataValues.group_message_id
      : messageData.group_message_id

    const checkGroup = await models.GroupMessage.findOne({
      where: {
        group_message_id: group_message_id ? group_message_id : ''
      }
    })

    if (checkGroup) {
      const data = { ...messageData, createdBy: sender, group_message_id: group_message_id }
      const message = await models.Message.create(data)
      await checkGroup.update({
        updatedAt: new Date()
      })
      const dataNotify = {
        type: 1,
        group_message_id: message.group_message_id,
        content: 'new message'
      }

      await seenMessageService.createSeenMessage(message.group_message_id, message.message_id, sender)
      await notifyMessageService.createNotify(dataNotify, sender)
      await messageSocketService.emitNotifyMessage(message.group_message_id, dataNotify, sender)
      await messageSocketService.emitNewMessage(message.group_message_id, sender)
    } else {
      const newGroupMessage = await models.GroupMessage.create({
        status: true,
        type: 1,
        createdBy: sender
      })
      const newGroupMessageId = newGroupMessage.group_message_id

      if (!messageData.receiver) {
        throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Không tìm thấy người nhận 1')
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
      const message = await models.Message.create(newMessageData)
      //
      const dataNotify = {
        type: 1,
        group_message_id: newGroupMessageId,
        content: 'new message'
      }
      await notifyMessageService.createNotify(dataNotify, sender)
      if (newGroupMessageId) {
        await seenMessageService.createSeenMessage(message.group_message_id, message.message_id, sender)
        await messageSocketService.emitNotifyMessage(newGroupMessageId, dataNotify, sender)
        await messageSocketService.emitNewMessage(newGroupMessageId, sender)
        await messageSocketService.emitNewConversation(newGroupMessageId)
      }
    }

    return {
      message: 'Gửi tin nhắn thành công!',
      data: {
        messageData
      }
    }
  }

  async sendCallMessage(messageData: MessageInput) {
    const checkGroup = await models.GroupMessage.findByPk(messageData.group_message_id)

    if (checkGroup) {
      const data = { ...messageData, createdBy: messageData.sender }
      const message = await models.Message.create(data)
      await checkGroup.update({
        updatedAt: new Date()
      })
      const dataNotify = {
        type: 1,
        group_message_id: messageData.group_message_id,
        content: 'new message'
      }

      await seenMessageService.createSeenMessage(
        messageData.group_message_id,
        message.message_id,
        messageData.sender as string
      )
      await notifyMessageService.createNotify(dataNotify, messageData.sender)
      await messageSocketService.emitNotifyMessage(
        messageData.group_message_id,
        dataNotify,
        messageData.sender as string
      )
      await messageSocketService.emitNewMessage(messageData.group_message_id, messageData.sender)
    } else {
      const newGroupMessage = await models.GroupMessage.create({
        status: true,
        type: 1,
        createdBy: messageData.sender as string
      })
      const newGroupMessageId = newGroupMessage.group_message_id

      if (!messageData.receiver) {
        throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Không tìm thấy người nhận 1')
      }

      await models.MemberGroup.bulkCreate([
        { user_id: messageData.sender as string, status: true, group_message_id: newGroupMessageId },
        { user_id: messageData.receiver, status: true, group_message_id: newGroupMessageId }
      ])

      const newMessageData = {
        ...messageData,
        createdBy: messageData.sender as string,
        group_message_id: newGroupMessageId
      }
      await models.Message.create(newMessageData)
      //
      const dataNotify = {
        type: 1,
        group_message_id: newGroupMessageId,
        content: 'new message'
      }
      await notifyMessageService.createNotify(dataNotify, messageData.sender as string)
      await messageSocketService.emitNotifyMessage(
        newGroupMessage.group_message_id,
        dataNotify,
        messageData.sender as string
      )
      await messageSocketService.emitNewMessage(messageData.group_message_id, messageData.sender)
      await messageSocketService.emitNewConversation(newGroupMessage.group_message_id)
    }

    return {
      message: 'Gửi tin nhắn thành công!',
      data: {
        messageData
      }
    }
  }

  async sendMessageAttach(messageMediaData: MessageMediaInput, sender: string) {
    const groupMessageIds = await models.MemberGroup.findOne({
      attributes: ['group_message_id'],
      where: {
        [Op.or]: [{ user_id: sender }, { user_id: messageMediaData.receiver }]
      },
      include: [
        {
          model: models.GroupMessage,
          attributes: [],
          required: true,
          where: {
            type: 1
          }
        }
      ],
      group: ['group_message_id'],
      having: Sequelize.literal('COUNT(DISTINCT user_id) = 2')
    })

    const group_message_id = groupMessageIds?.dataValues.group_message_id
      ? groupMessageIds?.dataValues.group_message_id
      : messageMediaData.group_message_id

    const checkGroup = await models.GroupMessage.findOne({
      where: {
        group_message_id: group_message_id ? group_message_id : ''
      }
    })

    if (checkGroup) {
      const data = { ...messageMediaData, group_message_id: checkGroup.group_message_id, createdBy: sender }

      await models.Message.create(data)
      await checkGroup.update({
        updatedAt: new Date()
      })
    } else {
      if (!messageMediaData.receiver) {
        throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Không tìm thấy người nhận 2')
      }
      const newGroupMessage = await models.GroupMessage.create({
        status: true,
        type: 1,
        createdBy: sender
      })
      const newGroupMessageId = newGroupMessage.group_message_id

      await models.MemberGroup.bulkCreate([
        { user_id: sender, status: true, group_message_id: newGroupMessageId },
        { user_id: messageMediaData.receiver, status: true, group_message_id: newGroupMessageId }
      ])

      const newmessageMediaData = {
        ...messageMediaData,
        createdBy: sender,
        group_message_id: newGroupMessageId
      }
      await models.Message.create(newmessageMediaData)
      await models.GroupMessage.update({ updatedAt: new Date() }, { where: { group_message_id: newGroupMessageId } })
    }
    await messageSocketService.emitNewMessage(messageMediaData.group_message_id, sender)

    return {
      message: 'Gửi tin nhắn thành công!',
      data: {
        messageMediaData
      }
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
        await messageSocketService.emitReactMessage(reactMessageData.message_id)
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
        // update
        await messageSocketService.emitReactMessage(reactMessageData.message_id)

        return {
          message: 'update ReactMessage ok',
          data: {}
        }
      }
    }

    const username = await this.getFullName(reactMessageData.user_id)
    const content = `${username} đã bày tỏ ${reactMessageData.emoji} về ${checkMessage.body} `
    const dataEmitNewImageNotify = {
      group_message_id: checkMessage.group_message_id,
      content: content,
      type: 3
    }

    await models.ReactMessage.create(reactMessageData)
    await messageSocketService.emitReactMessage(reactMessageData.message_id)
    await notifyMessageService.createNotify(dataEmitNewImageNotify, reactMessageData.user_id)
    await messageSocketService.emitNotifyMessage(checkMessage.group_message_id, {}, reactMessageData.user_id)
    return {
      message: 'sendReactMessage ok',
      data: {}
    }
  }

  async replyMessage(replyMessageInput: ReplyMessageInput, userLoggin: string) {
    const data = {
      ...replyMessageInput,
      createdBy: userLoggin
    }

    const message = await models.Message.create(data)
    const dataNotify = {
      type: 1,
      group_message_id: message.group_message_id,
      content: 'new message'
    }
    await messageSocketService.emitNewMessage(message.group_message_id, userLoggin)
    await seenMessageService.createSeenMessage(message.group_message_id, message.message_id, userLoggin)
    await notifyMessageService.createNotify(dataNotify, userLoggin)
    await messageSocketService.emitNotifyMessage(message.group_message_id, dataNotify, userLoggin)
    return {
      message: 'Gửi tin ok',
      data: {
        data
      }
    }
  }

  async recallMessage(message_id: string, userLoggin: string, forAll: boolean) {
    const message = await models.Message.findByPk(message_id)
    const recall = await models.RecallMessage.findAll({
      where: {
        message_id: message_id
      }
    })
    if (!message) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'khong tim thay tin nhan')
    }

    // thu hoi toan bo
    if (forAll) {
      if (message.createdBy !== userLoggin) {
        throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Khong co quyen xoa')
      }

      await message.update({
        status: false
      })

      const username = await this.getFullName(userLoggin)
      const content = `${username} đã thu hồi tin nhắn`
      const dataEmitNewNotify = {
        group_message_id: message.group_message_id,
        content: content,
        type: 3
      }

      await notifyMessageService.createNotify(dataEmitNewNotify, userLoggin)
      await messageSocketService.emitNotifyMessage(message.group_message_id, {}, userLoggin)
      await messageSocketService.emitNewMessage(message.group_message_id, userLoggin)
    } else {
      if (recall.filter((item) => item.user_id != userLoggin)) {
        await models.RecallMessage.create({
          user_id: userLoggin,
          message_id: message_id
        })
      }

      await messageSocketService.emitNewMessage(message.group_message_id, userLoggin)
    }

    return {
      message: 'recall ok',
      data: message
    }
  }

  async searchMessage(query: string, conversationId: string, userLoggin: string) {
    const conversation = await this.getMessage(conversationId, 0, 0, userLoggin)
    const message = conversation.data.filter((item) => {
      return item.body.includes(query)
    })

    return {
      message: 'searchMessage ok',
      data: message
    }
  }

  async changeImageGroup(group_id: string, image: string, user_id: string) {
    const checkGroup = await models.GroupMessage.findOne({
      where: {
        [Op.and]: {
          group_message_id: group_id,
          type: 2
        }
      }
    })

    if (!checkGroup) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tìm thấy nhóm changeImageGroup')
    }

    const data_image = await checkGroup.update({
      group_thumbnail: image
    })

    const user_name = await this.getFullName(user_id)
    const data = {
      group_message_id: data_image.group_message_id,
      user_name: user_name
    }
    const dataEmitNewImageNotify = {
      group_message_id: data_image.group_message_id,
      content: `${user_name} đã thay đổi ảnh nhóm`,
      type: 2
    }

    const dataMessageTypeZero = {
      createdBy: user_id,
      type: 0,
      group_message_id: data_image.group_message_id,
      body: `${user_name} đã thay đổi ảnh nhóm`,
      receiver: data_image.group_message_id,
      is_report: false,
      report_count: 0
    }
    await models.Message.create(dataMessageTypeZero)
    await notifyMessageService.createNotify(dataEmitNewImageNotify, user_id)
    await messageSocketService.emitNotifyMessage(group_id, {}, user_id)
    await messageSocketService.emitNewGroupImage(group_id, data)
    return {
      message: 'changeImageGroup ok',
      data
    }
  }

  async changeGroupName(group_id: string, group_name: string, user_id: string) {
    const checkGroup = await models.GroupMessage.findOne({
      where: {
        [Op.and]: {
          group_message_id: group_id,
          type: 2
        }
      }
    })

    if (!checkGroup) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tìm thấy nhóm changeGroupName')
    }

    const user_name = await this.getFullName(user_id)

    await checkGroup.update({
      group_name
    })

    const data = {
      group_message_id: group_id,
      group_name: group_name
    }
    const dataMessageTypeZero = {
      createdBy: user_id,
      type: 0,
      group_message_id: group_id,
      body: `${user_name} đã thay đổi tên nhóm`,
      receiver: group_id,
      is_report: false,
      report_count: 0
    }
    await this.sendMessage(dataMessageTypeZero, user_id)
    await messageSocketService.emitNewGroupName(group_id, data)

    return {
      message: 'thay đổi tên ok',
      data
    }
  }

  async getListFriendsSuggest(group_id: string, user_loggin: string) {
    const listMemberGroup = await models.MemberGroup.findAll({
      where: {
        group_message_id: group_id
      }
    })
    const listAllFriend = await userService.fetchFriendOfUser(user_loggin, 1, 1000)
    let data
    if (group_id) {
      data = listAllFriend.data.friends.filter((item) => {
        return !listMemberGroup.some((group) => group.user_id === item.user_id)
      })
    } else {
      data = listAllFriend
    }

    return {
      message: 'lấy list friend suggest ok',
      data
    }
  }

  async leaveAndDeleteUserGroup(group_id: string, user_id: string, userLoggin: string) {
    const checkMember = await models.MemberGroup.findOne({
      where: {
        [Op.and]: {
          group_message_id: group_id,
          user_id: user_id
        }
      }
    })

    if (!checkMember) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tìm thấy thành viên nhóm')
    }

    if (checkMember.role === true) {
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Chọn nhóm trưởng trước khi rời')
    } else {
      await checkMember.destroy()
      await deleteConversationService.deteleConversation(group_id, user_id)
      const userLogin = await this.getFullName(userLoggin)
      const userDelete = await this.getFullName(user_id)
      const dataMessageTypeZero = {
        createdBy: userLoggin,
        type: 0,
        group_message_id: group_id,
        body: `${user_id === userLoggin ? `${userLogin} đã rời nhóm` : `${userDelete} đã bị xóa khỏi nhóm`} `,
        receiver: group_id,
        is_report: false,
        report_count: 0
      }
      await this.sendMessage(dataMessageTypeZero, userLoggin)
      await messageSocketService.emitCurdMemberGroup(group_id, user_id)
    }
    return {
      message: 'xóa hoặc rời nhóm ok'
    }
  }

  async changeRoleGroup(group_id: string, user_id: string, user_loggin: string) {
    const [checkUser, checkUserAdmin] = await Promise.all([
      models.MemberGroup.findOne({
        where: {
          group_message_id: group_id,
          user_id,
          role: false
        }
      }),
      models.MemberGroup.findOne({
        where: {
          group_message_id: group_id,
          user_id: user_loggin,
          role: true
        }
      })
    ])

    if (!checkUser) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tìm thấy thành viên nhóm')
    }

    await checkUser.update({ role: true })

    if (!checkUserAdmin) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tìm thấy thành viên nhóm')
    }

    await checkUserAdmin.update({ role: false })

    return {
      message: 'đổi rule ok'
    }
  }

  async searchFriendAndConversation(user_id: string, keyword: string) {
    const listFriend = await userService.fetchFriendOfUser(user_id, 1, 100)
    const listConversation = await this.getConversation(user_id, 1, 100, true)
    // group_id, group_name, type
    const listConversationType1 = listConversation.data.data.filter((item: any) => {
      return item.type === 1
    })
    const arr = listFriend.data.friends.filter((friend) => {
      return !listConversationType1.some((item: any) => item.user_id === friend.user_id)
    })
    let newArr = arr.map((item) => {
      return {
        group_message_id: null,
        user_id: item.user_id,
        group_name: item.first_name + ' ' + item.last_name,
        group_thumbnail: item.Profile.profile_picture,
        type: 1
      }
    })
    let newlistConversation = listConversation.data.data.map((item: any) => {
      return {
        group_message_id: item.group_message_id ? item.group_message_id : null,
        user_id: item.user_id ? item.user_id : null,
        group_name: item.group_name,
        group_thumbnail: item.group_thumbnail,
        type: item.type
      }
    })
    const mergeArr = [...newArr, ...newlistConversation]
    // Tạo regex không phân biệt hoa thường
    const regex = new RegExp(keyword, 'i')
    // Tìm kiếm theo group_name
    const filteredArr = mergeArr.filter((item) => regex.test(item.group_name))
    return {
      data: filteredArr
    }
  }
}

export default new messageService()
