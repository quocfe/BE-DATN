import models from '../db/models'
import { sendResponseError } from '../utils/response'

class deleteConversationService {
  async deteleConversation(group_id: string, user_login: string) {
    const checkGroup = await models.GroupMessage.findByPk(group_id)

    if (!checkGroup) {
      throw new Error('Không tồn tại group')
    }

    const data = await models.DeleteGroupMessage.create({
      group_message_id: group_id,
      deletedBy: user_login,
      deletedAt: new Date()
    })

    return {
      message: 'tạo delete  group thành công',
      data
    }
  }

  async updateDeleteConversation(id: string) {
    const data = await models.DeleteGroupMessage.update(
      { deletedAt: new Date(), status: false },
      { where: { delete_group_message_id: id } }
    )

    return {
      message: 'update delete group thành công',
      data
    }
  }
}

export default new deleteConversationService()
