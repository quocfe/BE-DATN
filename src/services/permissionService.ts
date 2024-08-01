import { StatusCodes } from 'http-status-codes'
import models from '../db/models'
import { CustomErrorHandler } from '../utils/ErrorHandling'

class permissionService {
  async getAllPermission() {
    const permissions = await models.Permission.findAll()

    return {
      message: 'Danh sách quyền người dùng',
      data: {
        permissions
      }
    }
  }

  async addNewPermission(data: { name: string; display_name: string }) {
    const isPermissionExisting = await models.Permission.findOne({
      where: { name: data.name }
    })

    if (isPermissionExisting) {
      throw new CustomErrorHandler(StatusCodes.CONFLICT, 'Đã tồn tại quyền người dùng')
    }

    const newPermission = await models.Permission.create(data)

    return {
      message: '',
      data: {
        newPermission
      }
    }
  }

  async deletePermission(permission_id: string) {
    const permission = await models.Permission.findByPk(permission_id)

    if (!permission) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại quyền người dùng!')
    }

    await permission.destroy()

    return {
      message: 'Xóa thành công quyền người dùng',
      data: { permission }
    }
  }
}

export default new permissionService()
