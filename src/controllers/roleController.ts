import { Request, Response } from 'express'
import roleService from '../services/roleService'
import { sendResponseSuccess } from '../utils/response'

class roleController {
  async getAllRoles(req: Request, res: Response) {
    if (req.user) {
      const data = await roleService.getAllRoles()

      sendResponseSuccess(res, data)
    }
  }
}

export default new roleController()
