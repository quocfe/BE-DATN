import _ from 'lodash'
import models from '../db/models'
import { StatusCodes } from 'http-status-codes'

class userService {
  // Lấy thông tin người dùng
  async getProfile(user_id: string) {
    const user = await models.User.findByPk(user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: models.Role, as: 'role_data', attributes: ['role_name', 'description'] }]
    })

    return {
      message: 'Lấy thông tin người dùng thành công.',
      data: {
        user
      }
    }
  }
}

export default new userService()
