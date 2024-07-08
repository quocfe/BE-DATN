import { StatusCodes } from 'http-status-codes'
import models from '../db/models'
import { getReceiverSocketId, io } from '../sockets/socket'
import { CustomErrorHandler } from '../utils/ErrorHandling'

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
          await models.DeleteGroupMessage.update(
            { status: false },
            { where: { group_message_id, deletedBy: member.user_id } }
          )
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
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Không tìm thấy group_id emitNewMessage')
    }
  }
}

export default new messageSocketService()
