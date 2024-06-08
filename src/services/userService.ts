import _ from 'lodash'
import models from '../db/models'
import { StatusCodes } from 'http-status-codes'
import { CustomErrorHandler } from '../utils/ErrorHandling'
import { ProfileInput } from '../types/profile.type'
import { Op } from 'sequelize'
import { deleteImageOrVideoByPublicId, getPublicIdFromUrl } from '../utils/cloudinary'
import { compareValue } from '../utils/bcrypt'
import { hashSync } from 'bcryptjs'

class userService {
  // Danh sách người dùng
  async fetchAllUsers(user_id: string) {
    const status = ['Đã chấp nhận', 'Chờ chấp nhận', 'Đã chặn']
    const friends = await models.Friendship.findAll({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { user_id },
              {
                status: {
                  [Op.or]: status
                }
              }
            ]
          },
          {
            friend_id: user_id,
            status: {
              [Op.or]: status
            }
          }
        ]
      }
    })

    const friendUserIds: string[] = friends.map((friend) => {
      return friend.user_id === user_id ? friend.friend_id : friend.user_id
    })

    const users = await models.User.findAll({
      where: {
        user_id: {
          [Op.ne]: user_id,
          [Op.notIn]: friendUserIds
        }
      },
      attributes: ['user_id', 'first_name', 'last_name'],
      include: [
        {
          model: models.Profile,
          attributes: ['profile_picture']
        }
      ]
    })

    return {
      message: 'Danh sách người dùng',
      data: {
        users
      }
    }
  }

  // Lấy thông tin người dùng
  async getProfile(friend_id: string, user_id?: string) {
    const user = await models.User.findByPk(friend_id, {
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

    if (!user) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Người dùng này không tồn tại!')
    }

    let relationship

    // Kiểm tra xem mối quan hệ với người dùng này là gì
    if (user_id && friend_id !== user_id) {
      relationship = await models.Friendship.findOne({
        where: {
          user_id: friend_id,
          friend_id: user_id
        },
        attributes: ['status']
      })
    }

    return {
      message: 'Lấy thông tin người dùng thành công.',
      data: {
        user,
        relationship
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

    if (profileUser.profile_picture.includes('cloudinary')) {
      const public_id = getPublicIdFromUrl(profileUser.profile_picture)
      deleteImageOrVideoByPublicId(public_id)
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

    const existingRequest = await models.Friendship.findOne({
      where: {
        user_id,
        friend_id
      }
    })

    if (existingRequest) {
      throw new CustomErrorHandler(StatusCodes.CONFLICT, 'Đã gửi lời mời đến tài khoản này trước đó!')
    }

    // kiểm tra người dùng khác đã gửi kết bạn cho mình không
    const receivedRequest = await models.Friendship.findOne({
      where: {
        user_id: friend_id,
        friend_id: user_id,
        [Op.or]: [{ status: ['Chờ chấp nhận', 'Đã chặn'] }]
      }
    })

    if (receivedRequest) {
      if (receivedRequest.status === 'Chờ chấp nhận') {
        throw new CustomErrorHandler(
          StatusCodes.CONFLICT,
          'Người này đã gửi kết bạn tới bạn, vui lòng kiểm tra và chấp nhận lời mời kết bạn của họ!'
        )
      }

      if (receivedRequest.status === 'Đã chặn') {
        throw new CustomErrorHandler(StatusCodes.CONFLICT, 'Bạn với người dùng này đã chặn trên hệ thống!')
      }
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
    const friendRquests = await models.Friendship.findAll({
      where: {
        friend_id: user_id,
        status: 'Chờ chấp nhận'
      }
    })

    const listFriendIds = friendRquests.map((user) => {
      return user.user_id
    })

    const friends = await models.User.findAll({
      where: {
        user_id: listFriendIds
      },
      attributes: ['user_id', 'last_name', 'first_name'],
      include: [
        {
          model: models.Profile,
          attributes: ['profile_picture']
        }
      ]
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

    const friends = user?.Friends ?? []

    return {
      message: 'Danh sách bạn bè',
      data: { friends: friends }
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
          attributes: ['user_id', 'first_name', 'last_name'],
          include: [
            {
              model: models.Profile,
              attributes: ['profile_picture']
            }
          ]
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

  // Tìm kiếm bạn bè
  async searchFriends(user_id: string, name: string) {
    const user = await models.User.findByPk(user_id, {
      attributes: [],
      include: [
        {
          model: models.User,
          through: { attributes: [], where: { status: 'Đã chấp nhận' } },
          as: 'Friends',
          attributes: ['user_id', 'first_name', 'last_name'],
          where: {
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
          include: [
            {
              model: models.Profile,
              attributes: ['profile_picture']
            }
          ]
        }
      ]
    })

    const friends = user?.Friends ?? []

    return {
      message: 'Bạn bè đã tìm kiếm',
      data: {
        friends
      }
    }
  }

  // Thay đổi mật khẩu
  async changePassword(user_id: string, old_password: string, new_password: string) {
    const user = await models.User.findByPk(user_id)

    if (!user) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Người dùng không tồn tại!')
    }

    const isMatchPassword = compareValue(old_password, user.password)

    if (!isMatchPassword) {
      throw new CustomErrorHandler(StatusCodes.UNAUTHORIZED, 'Mật khẩu không chính xác!')
    }

    const password = hashSync(new_password, 8)

    await user.update({
      password
    })

    return {
      message: 'Đổi mật khẩu thành công',
      data: {}
    }
  }
}

export default new userService()
