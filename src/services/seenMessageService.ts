import { Op } from 'sequelize'
import models from '../db/models'
import { userSocketMap } from '../sockets/socket'
import messageService from './messageService'
import messageSocketService from './messageSocketService'

class seenMessageService {
  async createSeenMessage(group_message_id: string, message_id: string, user_id: string) {
    // user_id: user đăng nhập
    const exitGroup = await models.SeenMessage.findOne({
      where: {
        group_message_id
      }
    })

    const membersGroup = await models.MemberGroup.findAll({
      where: {
        group_message_id: group_message_id,
        user_id: { [Op.ne]: user_id }
      }
    })

    function createSeen() {
      membersGroup.forEach(async (member) => {
        await models.SeenMessage.create({
          group_message_id,
          message_id,
          user_id: member.user_id,
          createdBy: user_id,
          status: Object.keys(userSocketMap).includes(member.user_id.toString()) ? 'đã nhận' : 'đã gửi'
        })
      })
    }

    if (exitGroup) {
      await models.SeenMessage.destroy({
        where: {
          group_message_id
        }
      })

      createSeen()
    } else {
      createSeen()
    }
  }

  async receivedSeenMessage(user_id: string) {
    const [numberOfAffectedRows] = await models.SeenMessage.update(
      { status: 'đã nhận' },
      {
        where: {
          user_id,
          createdBy: {
            [Op.ne]: user_id
          },
          status: {
            [Op.ne]: 'đã xem'
          }
        }
      }
    )

    if (numberOfAffectedRows > 0) {
      const updatedMessages = await models.SeenMessage.findAll({
        where: {
          user_id,
          createdBy: {
            [Op.ne]: user_id
          }
        },
        attributes: ['group_message_id']
      })

      const emitPromises = updatedMessages.map(async (message) => {
        await messageSocketService.emitSeenedMessage(message.group_message_id)
      })

      // Wait for all emit operations to complete
      await Promise.all(emitPromises)
    }
  }

  async seenMessage(group_message_id: string, message_id: string, user_id: string) {
    if (message_id) {
      await models.SeenMessage.update({ status: 'đã xem' }, { where: { group_message_id, message_id, user_id } })
    } else {
      await models.SeenMessage.update({ status: 'đã xem' }, { where: { group_message_id, user_id } })
    }
  }

  async getAllSeen(group_message_id: string, user_id: string) {
    const seenMessages = await models.SeenMessage.findAll({
      where: {
        group_message_id: group_message_id,
        user_id: { [Op.ne]: user_id }
      }
    })

    const dataPromises = seenMessages.map(async (seen) => {
      const avatar = await messageService.getThubmail(seen.user_id)
      const fullName = await messageService.getFullName(seen.user_id)
      return {
        seen_message_id: seen.seen_message_id,
        user_id: seen.user_id,
        message_id: seen.message_id,
        group_message_id: seen.group_message_id,
        status: seen.status,
        createdBy: seen.createdBy,
        avatar: avatar,
        fullName: fullName,
        createdAt: seen.createdAt,
        updatedAt: seen.updatedAt
      }
    })

    const data = await Promise.all(dataPromises)

    return {
      message: 'seenMessage ok',
      data: data
    }
  }
}

export default new seenMessageService()
