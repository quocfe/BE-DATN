import _ from 'lodash'
import models from '../db/models'
import { StatusCodes } from 'http-status-codes'
import { CustomErrorHandler } from '../utils/ErrorHandling'
import { ProfileInput } from '../types/profile.type'
import { UserOutput } from '../types/user.type'

class userService {
  // Lấy thông tin người dùng
  async getProfile(user_id: string) {
    const user = await models.User.findByPk(user_id, {
      include: [
        {
          model: models.Profile,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        {
          model: models.Interest,
          through: { attributes: [] },
          attributes: ['interest_name'],
          required: true
        }
      ],
      attributes: { exclude: ['password', 'code', 'is_auth', 'expires', 'createdAt', 'updatedAt'] }
    })

    return {
      message: 'Lấy thông tin người dùng thành công.',
      data: {
        user
      }
    }
  }

  // Cập nhật hồ sơ người dùng
  async updateProfile(user_id: string, dataProfileUpdate: ProfileInput) {
    const { interestIds } = dataProfileUpdate
    const profileUser = await models.Profile.findOne({
      where: { user_id }
    })

    if (!profileUser) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Profile người dùng không tồn tại!')
    }

    await profileUser.update(dataProfileUpdate)

    if (interestIds && interestIds.length > 0) {
      const interests = await models.Interest.findAll({
        where: {
          interest_id: interestIds
        }
      })

      const user = await models.User.findByPk(profileUser.user_id)

      if (user) {
        await user.addInterests(interests)
      }
    }

    return {
      message: 'Cập nhật hồ sơ thành công!',
      data: {
        profile: profileUser
      }
    }
  }
}

export default new userService()
