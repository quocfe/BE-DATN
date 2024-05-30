import _ from 'lodash'
import models from '../db/models'
import { StatusCodes } from 'http-status-codes'
import { CustomErrorHandler } from '../utils/ErrorHandling'
import { ProfileInput } from '../types/profile.type'
import { Op } from 'sequelize'

class userService {
  // Lấy thông tin người dùng
  async getProfile(user_id: string) {
    const user = await models.User.findByPk(user_id, {
      attributes: { exclude: ['password', 'code', 'is_auth', 'expires', 'createdAt', 'updatedAt'] },
      include: [
        {
          model: models.Profile,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        {
          model: models.Interest,
          through: { attributes: [] },
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
      ]
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

    const user = await models.User.findByPk(profileUser.user_id, {
      attributes: { exclude: ['password', 'code', 'is_auth', 'expires', 'createdAt', 'updatedAt'] },
      include: [
        {
          model: models.Profile,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        {
          model: models.Interest,
          through: { attributes: [] },
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
      ]
    })

    if (interestIds && interestIds.length > 0) {
      const interests = await models.Interest.findAll({
        where: {
          interest_id: interestIds
        }
      })

      if (user) {
        await user.addInterests(interests)
      }
    }

    return {
      message: 'Cập nhật hồ sơ thành công!',
      data: {
        user
      }
    }
  }

  // Gửi lời mời kết bạn
  async senderFriendRequest(user_id: string, friend_id: string) {
    const user = await models.User.findByPk(friend_id)

    if (!user) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Người dùng không tồn tại!')
    }

    const friend = await models.Friendship.findOne({
      where: {
        user_id,
        friend_id
      }
    })

    if (friend) {
      throw new CustomErrorHandler(StatusCodes.CONFLICT, 'Đã gửi lời mời đến tài khoản này trước đó!')
    }

    await models.Friendship.create({
      user_id,
      friend_id
    })

    return {
      message: 'Gửi lời mới kết bạn thành công',
      data: {
        user_id,
        friend_id
      }
    }
  }

  // Danh sách lời mời kết bạn đã gửi
  async fetchAllSentFriendRequest(user_id: string) {
    const user = await models.User.findByPk(user_id, {
      attributes: [],
      include: [
        {
          model: models.User,
          through: {
            attributes: [],
            where: {
              status: 'Chờ chấp nhận'
            }
          },
          as: 'Friends',
          attributes: ['user_id', 'last_name', 'first_name'],
          include: [
            {
              model: models.Profile,
              attributes: ['profile_picture']
            }
          ]
        }
      ]
    })

    const friends = user?.Friends

    return {
      message: 'Danh sách lời mời kết bạn đã gửi',
      data: { friends }
    }
  }

  // Hủy lời mời kết bạn + Hủy kết bạn
  async cancelFriendRequest(user_id: string, friend_id: string) {
    const user = await models.User.findByPk(friend_id)

    if (!user) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Người dùng không tồn tại!')
    }

    const friend = await models.Friendship.findOne({
      where: { user_id, friend_id }
    })

    if (!friend) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại mối quan hệ với người này')
    }

    if (friend.status === 'Đã chấp nhận') {
      await models.Friendship.destroy({
        where: {
          [Op.or]: [
            { user_id, friend_id, status: 'Đã chấp nhận' },
            { user_id: friend_id, friend_id: user_id, status: 'Đã chấp nhận' }
          ]
        }
      })
    } else if (friend.user_id === user_id && friend.status === 'Chờ chấp nhận') {
      await friend.destroy()
    } else {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Chưa gửi lời mời kết bạn đến người dùng này!')
    }

    return {
      message: 'Thành công',
      data: {}
    }
  }

  // Danh sách người dùng đã gửi kết bạn tới tôi
  async fetchAllReceivedFriendRequest(user_id: string) {
    const friends = await models.Friendship.findAll({
      where: {
        friend_id: user_id,
        status: 'Chờ chấp nhận'
      }
    })

    return {
      message: 'Danh sách người dùng đã gửi kết bạn tới tôi',
      data: {
        friends
      }
    }
  }

  // Chấp nhận lời mời kết bạn
  async acceptFriendRequest(user_id: string, friend_id: string) {
    const user = await models.User.findByPk(friend_id)

    if (!user) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Người dùng không tồn tại!')
    }

    const friend = await models.Friendship.findOne({
      where: {
        user_id: friend_id,
        friend_id: user_id
      }
    })

    if (!friend) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại lời mời kết bạn người dùng này!')
    }

    if (friend.status === 'Đã chấp nhận') {
      throw new CustomErrorHandler(StatusCodes.CONFLICT, 'Hiện đang là bạn bè với người dùng này!')
    }

    await friend.update({ status: 'Đã chấp nhận' })
    await models.Friendship.create({ user_id, friend_id, status: 'Đã chấp nhận' })

    return {
      message: 'Chấp nhận lời mời kết bạn thành công',
      data: {}
    }
  }

  // Lấy danh sách bạn bè
  async fetchFriendOfUser(user_id: string) {
    const user = await models.User.findByPk(user_id, {
      attributes: [],
      include: [
        {
          model: models.User,
          through: {
            attributes: [],
            where: {
              status: 'Đã chấp nhận'
            }
          },
          as: 'Friends',
          attributes: ['user_id', 'last_name', 'first_name'],
          include: [
            {
              model: models.Profile,
              attributes: ['profile_picture']
            }
          ]
        }
      ]
    })

    const friends = user?.Friends

    return {
      message: 'Danh sách bạn bè',
      data: { friends }
    }
  } 

  // Tìm kiếm người dùng hoặc fanpage
  async searchUserOrFanpage(user_id: string, name: string) {
    const blocks = await models.Friendship.findAll({
      where: {
        status: 'Đã chặn'
      }
    })

    const blockedUserIds = blocks.map((block) => {
      return block.user_id === user_id ? block.friend_id : block.user_id
    })

    const listUserOrFanpage = await models.User.findAll({
      attributes: ['user_id', 'last_name', 'first_name'],
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              {
                last_name: {
                  [Op.like]: `${name.charAt(0).toUpperCase()}%`
                }
              },
              {
                first_name: {
                  [Op.like]: `${name.charAt(0).toUpperCase()}%`
                }
              }
            ]
          },
          {
            user_id: { [Op.notIn]: blockedUserIds }
          }
        ]
      },
      include: [
        {
          model: models.Profile,
          attributes: ['profile_picture']
        }
      ]
    })

    return {
      message: 'Danh sách tìm kiếm',
      data: {
        list: listUserOrFanpage
      }
    }
  }

  // Chặn người dùng
  async blockedUser(user_id: string, friend_id: string) {
    const user = await models.User.findByPk(friend_id)

    if (!user) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Người dùng không tồn tại!')
    }

    // Promise song song
    const [friend, existFriendRequest] = await Promise.all([
      models.Friendship.findOne({ where: { user_id, friend_id } }),
      models.Friendship.findOne({ where: { user_id: friend_id, friend_id: user_id } })
    ])

    // A
    if (friend) {
      if (friend.status === 'Đã chấp nhận' || friend.status === 'Chờ chấp nhận') {
        await friend.update({ status: 'Đã chặn' })
      } else if (friend.status === 'Đã chặn') {
        throw new CustomErrorHandler(StatusCodes.CONFLICT, 'Người dùng này đã bị chặn!')
      }
    }

    // B
    if (existFriendRequest) {
      if (existFriendRequest.status === 'Đã chặn') {
        throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tìm thấy người dùng này!')
      } else {
        await existFriendRequest.destroy()
        await models.Friendship.create({ user_id, friend_id, status: 'Đã chặn' })
      }
    }

    if (!friend && !existFriendRequest) {
      await models.Friendship.create({ user_id, friend_id, status: 'Đã chặn' })
    }

    return {
      message: 'Chặn người dùng thành công',
      data: {}
    }
  }

  // Hủy chặn người dùng
  async unblockedUser(user_id: string, friend_id: string) {
    const user = await models.User.findByPk(friend_id)

    if (!user) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Người dùng không tồn tại!')
    }

    const existBlockUser = await models.Friendship.findOne({
      where: {
        user_id,
        friend_id,
        status: 'Đã chặn'
      }
    })

    if (!existBlockUser) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Hiện đang không chặn người dùng này!')
    }

    await existBlockUser.destroy()

    return {
      message: 'Hủy chặn người dùng thành công!',
      data: {}
    }
  }

  // Danh sách chặn người dùng
  async fetchAllListBlockUser(user_id: string) {
    const user = await models.User.findByPk(user_id, {
      attributes: [],
      include: [
        {
          model: models.User,
          through: {
            attributes: [],
            where: {
              status: 'Đã chặn'
            }
          },
          as: 'Friends',
          attributes: ['user_id', 'first_name', 'last_name']
        },
        {
          model: models.Profile,
          attributes: ['profile_picture']
        }
      ]
    })

    const blockedUser = user?.Friends

    return {
      message: 'Danh sách chặn người dùng',
      data: {
        friends: blockedUser
      }
    }
  }
}

export default new userService()
