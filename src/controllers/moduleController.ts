import { Request, Response } from 'express'
import moduleService from '../services/moduleService'
import { sendResponseSuccess } from '../utils/response'

class moduleController {
  async getAllModules(req: Request, res: Response) {
    const data = await moduleService.getAllModules()

    sendResponseSuccess(res, data)
  }
}

export default new moduleController()
