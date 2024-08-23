import { StatusCodes } from 'http-status-codes'
import models from '../db/models'
import { AccountUpdate } from '../types/account.type'
import { CustomErrorHandler } from '../utils/ErrorHandling'

class accountService {
  async addNewAccount() {}

  async getAllAccounts() {
    const accounts = await models.Account.findAll({
      attributes: ['account_id', 'username', 'email', 'profile_picture', 'last_login', 'phone_number', 'address'],
      include: [
        {
          model: models.Role,
          as: 'role',
          attributes: ['role_id', 'name']
        },
        {
          model: models.Module,
          through: { attributes: [] },
          as: 'modules',
          attributes: ['module_id', 'name'],
          include: [
            {
              model: models.Permission,
              through: { attributes: [] },
              attributes: ['permission_id', 'name'],
              as: 'permissions'
            }
          ]
        }
      ]
    })

    return {
      message: 'Danh sách quản trị viên',
      data: { accounts }
    }
  }

  async updateAccount(account_id: string, accountInput: AccountUpdate) {
    const { user, modules } = accountInput

    const account = await models.Account.findByPk(account_id)

    if (!account) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại người dùng!')
    }

    if (user) {
      await account.update(user)
    }

    if (modules) {
      for (const moduleItem of modules) {
        // tìm kiếm module theo tên
        const module = await models.Module.findOne({ where: { name: moduleItem.name } })

        if (module) {
          // Xóa permissions hiện tại của account trong module này
          await models.AccountModulePermission.destroy({
            where: {
              account_id,
              module_id: module.module_id
            }
          })

          // Thêm permissions mới
          if (moduleItem.permissions) {
            for (const permissionItem of moduleItem.permissions) {
              // Tìm kiếm permission theo tên
              const permission = await models.Permission.findOne({
                where: {
                  name: permissionItem.name
                }
              })

              if (permission) {
                await models.AccountModulePermission.create({
                  account_id,
                  module_id: module.module_id,
                  permission_id: permission.permission_id
                })
              }
            }
          }
        }
      }
    }

    return {
      message: 'Cập nhật tài khoản thành công',
      data: {}
    }
  }
}

export default new accountService()
