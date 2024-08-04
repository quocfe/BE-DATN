import { Request, Response } from 'express'
import { sendResponseSuccess } from '../utils/response'
import deleteConversationService from '../services/deleteConversationService'

class deleteConversationController {
  async deteleConversation(req: Request, res: Response) {
    if (req.user) {
      const { id } = req.params
      const { user_id: userLoggin } = req.user
      const data = await deleteConversationService.deteleConversation(id, userLoggin)

      sendResponseSuccess(res, data)
    }
  }

  async updateDeleteConversation(req: Request, res: Response) {
    if (req.user) {
      const { id } = req.params
      const data = await deleteConversationService.updateDeleteConversation(id)
      sendResponseSuccess(res, data)
    }
  }
}

export default new deleteConversationController()
