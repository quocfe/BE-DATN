import { StatusCodes } from 'http-status-codes'
import models from '../db/models'
import { getReceiverSocketId, io } from '../sockets/socket'
import { CustomErrorHandler } from '../utils/ErrorHandling'
import { Op } from 'sequelize'
import { CallMessage } from '../types/socket.type'

class messageSocketService {
  async emitReactMessage(message_id: string) {
    if (message_id) {
      const message = await models.Message.findByPk(message_id)
      const memmbersId = await models.MemberGroup.findAll({ where: { group_message_id: message?.group_message_id } })

      memmbersId.forEach(async (member) => {
        const receiver = getReceiverSocketId(member.user_id)
        if (receiver) {
          io.to(receiver).emit('reactMessage', receiver)
        } else {
        }
      })
    } else {
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Không tìm thấy group_id emitReactMessage')
    }
  }

  async emitNewMessage(group_message_id: string, sender?: string) {
    if (group_message_id) {
      const memmbersId = await models.MemberGroup.findAll({
        where: {
          group_message_id
        }
      })
      const group = await models.GroupMessage.findOne({
        where: {
          group_message_id
        }
      })

      memmbersId.forEach(async (member) => {
        const receiver = getReceiverSocketId(member.user_id)
        const senderId = getReceiverSocketId(sender ? sender : '')
        if (receiver != senderId) {
          const data = {
            group_id: group?.group_message_id,
            id: sender,
            type: group?.type
          }
          io.to(receiver).emit('newMessage', data)
        }
      })

      await models.DeleteGroupMessage.update(
        { status: false },
        {
          where: {
            group_message_id,
            status: true
          }
        }
      )
    } else {
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Không tìm thấy group_id emitNewMessage')
    }
  }

  async emitNewConversation(group_message_id: string) {
    if (group_message_id) {
      const memmbersId = await models.MemberGroup.findAll({
        where: {
          group_message_id
        }
      })
      memmbersId.forEach(async (member) => {
        const receiver = getReceiverSocketId(member.user_id)
        if (receiver) {
          io.to(receiver).emit('newConversation', receiver)
        }
      })
    } else {
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Không tìm thấy group_id emitNewConversation')
    }
  }

  async emitNewGroupImage(group_message_id: string, data: {}) {
    if (group_message_id) {
      const memmbersId = await models.MemberGroup.findAll({
        where: {
          group_message_id
        }
      })
      memmbersId.forEach(async (member) => {
        const receiver = getReceiverSocketId(member.user_id)
        if (receiver) {
          io.to(receiver).emit('newGroupImage', data)
        }
      })
    } else {
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Không tìm thấy group_id emitNewGroupImage')
    }
  }

  async emitNewGroupName(group_message_id: string, data: {}) {
    if (group_message_id) {
      const memmbersId = await models.MemberGroup.findAll({
        where: {
          group_message_id
        }
      })
      memmbersId.forEach(async (member) => {
        const receiver = getReceiverSocketId(member.user_id)
        if (receiver) {
          console.log('socket new image')
          io.to(receiver).emit('newGroupName', data)
        }
      })
    } else {
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Không tìm thấy group_id emitNewGroupName')
    }
  }

  async emitIsTyping(group_message_id: string, user_id?: string, userLoggin?: string) {
    if (group_message_id) {
      const memmbersId = await models.MemberGroup.findAll({
        where: {
          group_message_id
        }
      })
      memmbersId.forEach(async (member) => {
        const receiver = getReceiverSocketId(member.user_id)
        const sender = getReceiverSocketId(userLoggin || '')
        const user = await models.User.findByPk(user_id)
        const fullname = user?.first_name + ' ' + user?.last_name
        const data = {
          group_message_id,
          fullname
        }
        if (receiver != sender) {
          io.to(receiver).emit('isTyping', data)
        }
      })
    }
  }
  async emitIsNotTyping(group_message_id: string, user_id?: string) {
    if (group_message_id) {
      const memmbersId = await models.MemberGroup.findAll({
        where: {
          group_message_id
        }
      })
      memmbersId.forEach(async (member) => {
        const receiver = getReceiverSocketId(member.user_id)
        if (receiver) {
          io.to(receiver).emit('isNotTyping', user_id)
        }
      })
    }
  }

  async emitNotifyMessage(group_message_id: string, data: {}, sendeID: string) {
    if (group_message_id) {
      const memmbersId = await models.MemberGroup.findAll({
        where: {
          group_message_id
        }
      })
      memmbersId.forEach(async (member) => {
        const receiver = getReceiverSocketId(member.user_id)
        const sender = getReceiverSocketId(sendeID)

        if (receiver != sender) {
          io.to(receiver).emit('newNotifyMessage', data)
        }
      })
    } else {
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Không tìm thấy group_id emitNotifyMessage')
    }
  }

  async emitDeleteNotifyMessage(group_message_id: string, sendeID: string) {
    const sender = getReceiverSocketId(sendeID)
    if (sender) {
      io.to(sender).emit('deleteNotifyMessage')
    }
  }
  async emitCurdMemberGroup(group_message_id: string) {
    if (group_message_id) {
      const memmbersId = await models.MemberGroup.findAll({
        where: {
          group_message_id
        }
      })

      memmbersId.forEach(async (member) => {
        const receiver = getReceiverSocketId(member.user_id)

        if (receiver) {
          io.to(receiver).emit('deleteOrLeaveGroup', receiver)
          await models.DeleteGroupMessage.update(
            { status: false },
            { where: { group_message_id, deletedBy: member.user_id } }
          )
        }
      })
    } else {
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Không tìm thấy group_id emitCurdMemberGroup')
    }
  }

  async emitSeenedMessage(group_message_id: string) {
    if (group_message_id) {
      const memmbersId = await models.MemberGroup.findAll({
        where: {
          group_message_id
        }
      })

      memmbersId.forEach(async (member) => {
        const receiver = getReceiverSocketId(member.user_id)
        if (receiver) {
          io.to(receiver).emit('seenedMessage')
        }
      })
    } else {
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Không tìm thấy group_id emitSeenedMessage')
    }
  }

  async emitInComingCall(data: CallMessage) {
    if (data.group_message_id) {
      const memmbersId = await models.MemberGroup.findAll({
        where: {
          group_message_id: data.group_message_id,
          user_id: {
            [Op.ne]: data.user_id
          }
        }
      })

      memmbersId.forEach(async (member) => {
        const receiver = getReceiverSocketId(member.user_id)

        if (receiver) {
          io.to(receiver).emit('inComingCallVideo', data)
        }
      })
    } else {
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Không tìm thấy group_id emitInComingCall')
    }
  }

  async emitCancelVideoCall(data: CallMessage) {
    if (data.group_message_id) {
      const memmbersId = await models.MemberGroup.findAll({
        where: {
          group_message_id: data.group_message_id,
          user_id: {
            [Op.ne]: data.user_id
          }
        }
      })

      memmbersId.forEach(async (member) => {
        const receiver = getReceiverSocketId(member.user_id)

        if (receiver) {
          io.to(receiver).emit('cancelVideoCall')
        }
      })
    } else {
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Không tìm thấy group_id emitCancelVideoCall')
    }
  }
  async emitCancelInComingVideoCall(data: CallMessage) {
    // console.log('emitCancelInComingVideoCall', data)
    if (data.group_message_id) {
      // const memmbersId = await models.MemberGroup.findAll({
      //   where: {
      //     group_message_id: data.group_message_id,
      //     user_id: {
      //       [Op.ne]: data.user_id
      //     }
      //   }
      // })

      // memmbersId.forEach(async (member) => {
      // })
      const receiver = getReceiverSocketId(data.user_id)

      if (receiver) {
        io.to(receiver).emit('cancelInComingVideoCall')
      }
    } else {
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Không tìm thấy group_id emitCancelInComingVideoCall')
    }
  }

  async emitAcceptVideoCall(data: CallMessage) {
    if (data.group_message_id) {
      const memmbersId = await models.MemberGroup.findAll({
        where: {
          group_message_id: data.group_message_id
        }
      })

      memmbersId.forEach(async (member) => {
        const receiver = getReceiverSocketId(member.user_id)

        if (receiver) {
          io.to(receiver).emit('acceptVideoCall', data)
        }
      })
    } else {
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Không tìm thấy group_id emitAcceptVideoCall')
    }
  }

  async emitEndCall(group_id_query: CallMessage) {
    if (group_id_query) {
      const memmbersId = await models.MemberGroup.findAll({
        where: {
          group_message_id: group_id_query
        }
      })

      memmbersId.forEach(async (member) => {
        const receiver = getReceiverSocketId(member.user_id)

        if (receiver) {
          io.to(receiver).emit('endCall')
        }
      })
    } else {
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Không tìm thấy group_id emitEndCall')
    }
  }
}

export default new messageSocketService()
