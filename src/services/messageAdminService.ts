import models from '../db/models'

class messageAdminService {
  async reportMesssage(messsage_id: string) {
    // TODO: xử lý vi phạm tin nhắn
    const message = await models.Message.findByPk(messsage_id)
    if (message) {
      if (message.report_count > 5) {
        message.is_report = true
      } else {
        message.report_count++
      }
      await message.save()
    }

    return {
      message: 'xử lý vi phạm tin nhắn ok'
    }
  }
}

export default new messageAdminService()
