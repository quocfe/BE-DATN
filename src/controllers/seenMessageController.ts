import { Request, Response } from 'express'
import seenMessageService from '../services/seenMessageService'
import { sendResponseSuccess } from '../utils/response'

class seenMessageController {
  async getAllSeen(req: Request, res: Response) {
    if (req.user) {
      const { user_id: userLoggin } = req.user
      const { id: group_message_id } = req.params
      const data = await seenMessageService.getAllSeen(group_message_id, userLoggin)
      sendResponseSuccess(res, data)
    }
  }
}

export default new seenMessageController()
