import { Request, Response } from 'express'
import permissionService from '../services/permissionService'
import { sendResponseSuccess } from '../utils/response'

class permissionController {
  async addNewPermission(req: Request, res: Response) {
    const body = req.body

    const data = await permissionService.addNewPermission(body)

    sendResponseSuccess(res, data)
  }

  async getAllPermissions(req: Request, res: Response) {
    const data = await permissionService.getAllPermission()

    sendResponseSuccess(res, data)
  }

  async deletePermission(req: Request, res: Response) {
    const { permission_id } = req.params
    const data = await permissionService.deletePermission(permission_id)

    sendResponseSuccess(res, data)
  }
}

export default new permissionController()
