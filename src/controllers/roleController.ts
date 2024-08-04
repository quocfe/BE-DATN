import { Request, Response } from 'express'
import roleService from '../services/roleService'
import { sendResponseSuccess } from '../utils/response'
import { RoleInput } from '../types/role.type'

class roleController {
  async addNewRole(req: Request, res: Response) {
    const roleInput: RoleInput = req.body

    const data = await roleService.addNewRole(roleInput)

    sendResponseSuccess(res, data)
  }

  async getAllRoles(req: Request, res: Response) {
    const data = await roleService.getAllRoles()

    sendResponseSuccess(res, data)
  }

  async deleteRole(req: Request, res: Response) {
    const { role_id } = req.params
    const data = await roleService.deleteRole(role_id)

    sendResponseSuccess(res, data)
  }
}

export default new roleController()
