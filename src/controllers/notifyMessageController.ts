import { Request, Response } from 'express'
import notifyMessageService from '../services/notifyMessageService'
import { sendResponseSuccess } from '../utils/response'

class notifyMessageController {
  async createNotify(req: Request, res: Response) {
    const input = req.body
    const data = await notifyMessageService.createNotify(input)
    sendResponseSuccess(res, data)
  }

  async getAllNotify(req: Request, res: Response) {
    if (req.user) {
      const { user_id: userLoggin } = req.user
      const data = await notifyMessageService.getAllNotify(userLoggin)
      sendResponseSuccess(res, data)
    }
  }

  async deleteNotify(req: Request, res: Response) {
    if (req.user) {
      const { id } = req.params
      const { user_id: userLoggin } = req.user
      const data = await notifyMessageService.deleteNotify(id, userLoggin)
      res.status(200).json(data)
    }
  }
}

export default new notifyMessageController()
