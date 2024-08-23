import { Request, Response } from 'express'
import messageAdminService from '../services/messageAdminService'
import { sendResponseSuccess } from '../utils/response'

class messageAdminController {
  async reportMesssage(req: Request, res: Response) {
    if (req.user) {
      const { message_id } = req.body
      const data = await messageAdminService.reportMesssage(message_id)
      res.status(200).json(data)
    }
  }
}

export default new messageAdminController()
