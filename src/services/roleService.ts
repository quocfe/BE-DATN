import { StatusCodes } from 'http-status-codes'
import models from '../db/models'
import { RoleInput } from '../types/role.type'
import { CustomErrorHandler } from '../utils/ErrorHandling'

class RoleService {
  async getAllRoles() {
    const roles = await models.Role.findAll({
      include: [
        {
          model: models.Account,
          as: 'accounts',
          attributes: ['username', 'profile_picture']
        }
      ]
    })

    return {
      message: 'Danh sách vai trò',
      data: {
        roles
      }
    }
  }

  async addNewRole(roleInput: RoleInput) {
    const isRoleExisting = await models.Role.findOne({
      where: { name: roleInput.name }
    })

    if (isRoleExisting) {
      throw new CustomErrorHandler(StatusCodes.CONFLICT, 'Vai trò này đã tồn tại trên hệ thống')
    }

    const newRole = await models.Role.create(roleInput)

    return {
      message: 'Thêm mới vai trò thành công',
      data: {
        role: newRole
      }
    }
  }

  async deleteRole(role_id: string) {
    const role = await models.Role.findByPk(role_id, {
      include: [
        {
          model: models.Account,
          as: 'accounts'
        }
      ]
    })

    if (!role) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại vai trò!')
    }

    if (role.accounts.length > 0) {
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Không thể xóa vai trò đang được sử dụng')
    }

    await role.destroy()

    return {
      message: 'Xóa vai trò thành công',
      data: { role }
    }
  }
}

export default new RoleService()
