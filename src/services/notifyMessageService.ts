import { StatusCodes } from 'http-status-codes'
import models from '../db/models'
import { NotifyGroupMessageInput } from '../types/notifyMessage.type'
import { CustomErrorHandler } from '../utils/ErrorHandling'
import { Op } from 'sequelize'
import GroupMessage from '../db/models/GroupMessage'
import messageSocketService from './messageSocketService'

class notifyMessageService {
  async createNotify(input: NotifyGroupMessageInput, sender?: string) {
    const checkGroupId = await models.GroupMessage.findByPk(input.group_message_id)
    if (!checkGroupId) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tìm thấy nhóm ở createNotify')
    }
    const membersGroup = await models.MemberGroup.findAll({
      where: {
        group_message_id: input.group_message_id
      }
    })

    const data = await Promise.all(
      membersGroup.map(async (member) => {
        const data = {
          ...input,
          receiver_id: member.user_id,
          status: true
        }
        if (sender != member.user_id) {
          await models.NotifyGroupMessage.create(data)
        }
      })
    )

    return {
      message: 'create notification ok',
      data
    }
  }

  async getAllNotify(userLoggin: string) {
    const data = await models.NotifyGroupMessage.findAll({
      where: {
        receiver_id: userLoggin
      },
      order: ['createdAt']
    })
    return {
      message: 'get all notification ok',
      data
    }
  }

  async deleteNotify(group_id: string, userLoggin: string) {
    if (group_id && userLoggin) {
      const data = await models.NotifyGroupMessage.destroy({
        where: {
          group_message_id: group_id,
          receiver_id: userLoggin
        }
      })
      await messageSocketService.emitDeleteNotifyMessage(group_id, userLoggin)
      return {
        message: 'delete notification ok',
        data
      }
    }
  }
}

export default new notifyMessageService()
