import { StatusCodes } from 'http-status-codes'
import models from '../db/models'
import { getReceiverSocketId, io } from '../sockets/socket'
import { CustomErrorHandler } from '../utils/ErrorHandling'
import { ReactMessageInput } from '../types/reactMessage.type'
import { MessageInput, MessageMediaInput } from '../types/message.type'

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
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Không tìm thấy người nhận react message socket')
    }
  }

  async emitNewMessage(group_message_id: string) {
    if (group_message_id) {
      const memmbersId = await models.MemberGroup.findAll({
        where: {
          group_message_id
        }
      })
      memmbersId.forEach(async (member) => {
        const receiver = getReceiverSocketId(member.user_id)
        if (receiver) {
          io.to(receiver).emit('newMessage', receiver)
          // const seenMessage = await models.SeenMessage.create({
          //   message_id: messageSocket.message_id,
          //   user_id: member.user_id,
          //   status: false
          // })
          // io.to(receiver).emit('notifyMessage', messageSocket.group_message_id)
        } else {
          // await models.SeenMessage.create({
          //   message_id: messageSocket.message_id,
          //   user_id: member.user_id,
          //   status: false
          // })
        }
      })
    } else {
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Không tìm thấy người nhận new message socket')
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
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Không tìm thấy người nhận new converstaion socket')
    }
  }
}

export default new messageSocketService()
