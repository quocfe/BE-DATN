import _ from 'lodash'
import models from '../db/models'
import { StatusCodes } from 'http-status-codes'
import { CustomErrorHandler } from '../utils/ErrorHandling'
import { ProfileInput } from '../types/profile.type'
import { FindAttributeOptions, Includeable, Op, WhereOptions } from 'sequelize'
import { deleteImageOrVideoByPublicId, getPublicIdFromUrl } from '../utils/cloudinary'
import { compareValue } from '../utils/bcrypt'
import { hashSync } from 'bcryptjs'
import { UserAttributes } from '../db/models/User'
import { RELATIONSHIP } from '../constants/relationshipStatus'

class userService {
  private userUtils = {
    // Lấy danh sách bạn bè
    async getFriends(user_id: string) {
      return await models.Friendship.findAll({
        where: {
          [Op.or]: [{ friend_id: user_id }, { user_id: user_id }],
          status: RELATIONSHIP.FRIEND
        }
      })
    }
  }

  // Danh sách người dùng
  async fetchAllUsers(user_id: string, page: number | undefined, limit: number | undefined) {
    const offset = page && limit ? (page - 1) * limit : undefined
    const status = [RELATIONSHIP.FRIEND, RELATIONSHIP.BLOCKED, RELATIONSHIP.PENDING_FRIEND_REQUEST]

    const userRelationships = await models.Friendship.findAll({
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

    // Danh sách bạn bè của tôi -> find bạn chung
    const acceptedFriendships = await this.userUtils.getFriends(user_id)

    const friendIds = [
      ...new Set(
        acceptedFriendships.map((friendship) => {
          return friendship.user_id === user_id ? friendship.friend_id : friendship.user_id
        })
      )
    ].filter((id) => id !== user_id)

    const relationshipUserIds = [
      ...new Set(
        userRelationships.map((friendship) => {
          return friendship.user_id === user_id ? friendship.friend_id : friendship.user_id
        })
      )
    ]

    const userExclusionCondition: WhereOptions<UserAttributes> | undefined = {
      user_id: {
        [Op.ne]: user_id,
        [Op.notIn]: relationshipUserIds
      }
    }

    const userAttributes: FindAttributeOptions | undefined = ['user_id', 'first_name', 'last_name']

    const userIncludeOptions: Includeable | Includeable[] | undefined = [
      {
        model: models.User,
        as: 'UserFriends',
        attributes: userAttributes,
        through: {
          attributes: [],
          where: {
            user_id: friendIds
          }
        },
        include: [
          {
            model: models.Profile,
            attributes: ['profile_picture', 'cover_photo']
          }
]
      },
      {
        model: models.Profile,
        attributes: ['profile_picture', 'cover_photo']
      }
    ]

    const total = await models.User.count({
      where: userExclusionCondition
    })

    const pages = limit ? Math.ceil(total / limit) : 1

    const users = await models.User.findAll({
      where: userExclusionCondition,
      attributes: userAttributes,
      include: userIncludeOptions,
      offset,
      limit
    })

    const userWithCommonFriends = users.map((user) => {
      return {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        Profile: user.Profile,
        CommonFriends: user.UserFriends
      }
    })

    return {
      message: 'Danh sách người dùng',
      data: {
        users: userWithCommonFriends,
        page,
        limit,
        total,
        pages
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

    let userRelationship

    // Kiểm tra xem mối quan hệ với người dùng này là gì
    if (user_id && friend_id !== user_id) {
      userRelationship = await models.Friendship.findOne({
        attributes: ['user_id', 'friend_id', 'status'],
        where: {
          [Op.or]: [
            {
              user_id,
              friend_id
            },
            {
              user_id: friend_id,
              friend_id: user_id
            }
          ]
        }
      })
    }

    return {
      message: 'Lấy thông tin người dùng thành công.',
      data: {
        user,
        relationship: userRelationship
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
        [Op.or]: [{ status: [RELATIONSHIP.PENDING_FRIEND_REQUEST, RELATIONSHIP.BLOCKED] }]
      }
    })

    if (receivedRequest) {
      if (receivedRequest.status === RELATIONSHIP.PENDING_FRIEND_REQUEST) {
        throw new CustomErrorHandler(
          StatusCodes.CONFLICT,
          'Người này đã gửi kết bạn tới bạn, vui lòng kiểm tra và chấp nhận lời mời kết bạn của họ!'
        )
      }

      if (receivedRequest.status === RELATIONSHIP.BLOCKED) {
        throw new CustomErrorHandler(StatusCodes.CONFLICT, 'Bạn với người dùng này đã chặn trên hệ thống!')
      }
    }

    await models.Friendship.create({
      user_id,
      friend_id
    })

    return {
      message: 'Gửi lời mới kết bạn thành công',
      data: {}
    }
  }

  // Danh sách lời mời kết bạn đã gửi
  async fetchAllSentFriendRequest(user_id: string, page: number | undefined, limit: number | undefined) {
    const offset = page && limit ? (page - 1) * limit : undefined

    const sentFriendRequests = await models.Friendship.findAll({
      where: {
        user_id,
        status: RELATIONSHIP.PENDING_FRIEND_REQUEST
      }
    })

    const sentFriendRequestIds = sentFriendRequests.map((friendship) => {
      return friendship.friend_id
    })

    // Danh sách bạn bè của tôi -> find bạn chung
    const acceptedFriendships = await this.userUtils.getFriends(user_id)

    const friendIds = [
      ...new Set(
acceptedFriendships.map((friendship) => {
          return friendship.user_id === user_id ? friendship.friend_id : friendship.user_id
        })
      )
    ].filter((id) => id !== user_id)

    const friends = await models.User.findAll({
      where: { user_id: sentFriendRequestIds },
      attributes: ['user_id', 'first_name', 'last_name'],
      include: [
        {
          model: models.User,
          as: 'UserFriends',
          attributes: ['user_id', 'first_name', 'last_name'],
          through: {
            attributes: [],
            where: {
              user_id: friendIds
            }
          },
          include: [
            {
              model: models.Profile,
              attributes: ['profile_picture', 'cover_photo']
            }
          ]
        },
        {
          model: models.Profile,
          attributes: ['profile_picture', 'cover_photo']
        }
      ],
      limit,
      offset
    })

    const total = sentFriendRequestIds.length
    const pages = limit ? Math.ceil(total / limit) : 1

    const userWithCommonFriends = friends.map((user) => {
      return {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        Profile: user.Profile,
        CommonFriends: user.UserFriends
      }
    })

    return {
      message: 'Danh sách lời mời kết bạn đã gửi',
      data: { friends: userWithCommonFriends, page, limit, pages, total }
    }
  }

  // Hủy lời mời kết bạn + Hủy kết bạn
  async cancelFriendRequest(user_id: string, friend_id: string) {
    const user = await models.User.findByPk(friend_id)

    if (!user) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Người dùng không tồn tại!')
    }

    const friendshipRecord = await models.Friendship.findOne({
      where: { user_id, friend_id }
    })

    if (!friendshipRecord) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại mối quan hệ với người này')
    }

    if (friendshipRecord.status === RELATIONSHIP.FRIEND) {
      await models.Friendship.destroy({
        where: {
          [Op.or]: [
            { user_id, friend_id, status: RELATIONSHIP.FRIEND },
            { user_id: friend_id, friend_id: user_id, status: RELATIONSHIP.FRIEND }
          ]
        }
      })
    } else if (
      friendshipRecord.user_id === user_id &&
      friendshipRecord.status === RELATIONSHIP.PENDING_FRIEND_REQUEST
    ) {
      await friendshipRecord.destroy()
    } else {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Chưa gửi lời mời kết bạn đến người dùng này!')
    }

    return {
      message: 'Thành công',
      data: {}
    }
  }

  // Danh sách người dùng đã gửi kết bạn tới tôi
  async fetchAllReceivedFriendRequest(user_id: string, page: number | undefined, limit: number | undefined) {
    const offset = page && limit ? (page - 1) * limit : undefined
const receivedFriendRequests = await models.Friendship.findAll({
      where: {
        friend_id: user_id,
        status: RELATIONSHIP.PENDING_FRIEND_REQUEST
      }
    })

    const receivedFriendRequestIds = receivedFriendRequests.map((friendship) => {
      return friendship.user_id
    })

    // Danh sách bạn bè của tôi -> find bạn chung
    const acceptedFriendships = await this.userUtils.getFriends(user_id)

    const friendIds = [
      ...new Set(
        acceptedFriendships.map((friendship) => {
          return friendship.user_id === user_id ? friendship.friend_id : friendship.user_id
        })
      )
    ].filter((id) => id !== user_id)

    const friends = await models.User.findAll({
      where: {
        user_id: receivedFriendRequestIds
      },
      attributes: ['user_id', 'last_name', 'first_name'],
      include: [
        {
          model: models.User,
          as: 'UserFriends',
          attributes: ['user_id', 'last_name', 'first_name'],
          through: {
            attributes: [],
            where: {
              user_id: friendIds
            }
          },
          include: [
            {
              model: models.Profile,
              attributes: ['profile_picture', 'cover_photo']
            }
          ]
        },
        {
          model: models.Profile,
          attributes: ['profile_picture', 'cover_photo']
        }
      ],
      limit,
      offset
    })

    const total = receivedFriendRequestIds.length
    const pages = limit ? Math.ceil(total / limit) : 1

    const userWithCommonFriends = friends.map((user) => {
      return {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        Profile: user.Profile,
        CommonFriends: user.UserFriends
      }
    })

    return {
      message: 'Danh sách người dùng đã gửi kết bạn tới tôi',
      data: {
        friends: userWithCommonFriends,
        page,
        limit,
        pages,
        total
      }
    }
  }

  // Chấp nhận lời mời kết bạn
  async acceptFriendRequest(user_id: string, friend_id: string) {
    const user = await models.User.findByPk(friend_id)

    if (!user) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Người dùng không tồn tại!')
    }

    const friendRequest = await models.Friendship.findOne({
      where: {
        user_id: friend_id,
        friend_id: user_id
      }
    })

    if (!friendRequest) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại lời mời kết bạn người dùng này!')
    }

    if (friendRequest.status === RELATIONSHIP.FRIEND) {
      throw new CustomErrorHandler(StatusCodes.CONFLICT, 'Hiện đang là bạn bè với người dùng này!')
    }

    await friendRequest.update({ status: RELATIONSHIP.FRIEND })
    await models.Friendship.create({ user_id, friend_id, status: RELATIONSHIP.FRIEND })

    return {
message: 'Chấp nhận lời mời kết bạn thành công',
      data: {}
    }
  }

  // Lấy danh sách bạn bè
  async fetchFriendOfUser(user_id: string, page: number | undefined, limit: number | undefined) {
    const offset = page && limit ? (page - 1) * limit : undefined

    const acceptedFriendships = await this.userUtils.getFriends(user_id)

    const friendIds = [
      ...new Set(
        acceptedFriendships.map((friendship) => {
          return friendship.user_id === user_id ? friendship.friend_id : friendship.user_id
        })
      )
    ].filter((id) => id !== user_id)

    const total = friendIds.length
    const pages = limit ? Math.ceil(total / limit) : 1

    const userAttributes: FindAttributeOptions | undefined = ['user_id', 'last_name', 'first_name']

    const friends = await models.User.findAll({
      where: { user_id: friendIds },
      attributes: userAttributes,
      include: [
        {
          model: models.Profile,
          attributes: ['profile_picture', 'cover_photo']
        },
        {
          model: models.User,
          as: 'UserFriends',
          attributes: userAttributes,
          through: {
            attributes: [],
            where: { user_id: friendIds }
          },
          include: [
            {
              model: models.Profile,
              attributes: ['profile_picture', 'cover_photo']
            }
          ]
        }
      ],
      limit,
      offset
    })

    const newFriends = friends.map((friend) => {
      return {
        user_id: friend.user_id,
        first_name: friend.first_name,
        last_name: friend.last_name,
        Profile: friend.Profile,
        CommonFriends: friend.UserFriends
      }
    })

    return {
      message: 'Danh sách bạn bè',
      data: { friends: newFriends, page, pages, limit, total }
    }
  } 

  // Tìm kiếm người dùng hoặc fanpage
  async searchUserOrFanpages(user_id: string, name: string) {
    const friendships = await models.Friendship.findAll()

    const blockedFriendships = friendships.filter((f) => f.status === RELATIONSHIP.BLOCKED)

    // acc: accumulator - biến tích lũy
    const blockedUserIds = blockedFriendships.reduce((acc: string[], block) => {
      if (block.user_id === user_id) {
        acc.push(block.friend_id)
      } else if (block.friend_id === user_id) {
        acc.push(block.user_id)
      }
      return acc
    }, [])

    const searchName = name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : ''

    const searchResults = await models.User.findAll({
      attributes: ['user_id', 'last_name', 'first_name'],
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              {
                last_name: {
                  [Op.like]: `${searchName}%`
                }
              },
              {
                first_name: {
                  [Op.like]: `${searchName}%`
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

    const userSearchWithStatus = searchResults.map((user) => {
      // kiểm tra mối quan hệ giữa người dùng được tìm kiếm và người dùng đang tìm kiếm
      const record = friendships.find(
        (f) =>
          (f.user_id === user.user_id && f.friend_id === user_id) ||
          (f.friend_id === user.user_id && f.user_id === user_id)
      )

      let status = ''

      if (record) {
        status =
          record.status === RELATIONSHIP.PENDING_FRIEND_REQUEST
            ? record.user_id === user_id
              ? RELATIONSHIP.WAITING_FOR_RESPONSE
              : RELATIONSHIP.PENDING_FRIEND_REQUEST
            : RELATIONSHIP.FRIEND
      } else {
        status = user.user_id === user_id ? 'Tôi' : 'Chưa kết bạn'
      }

      return {
        ...user.toJSON(),
        status: status
      }
    })

    return {
      message: 'Danh sách tìm kiếm',
      data: {
        list: userSearchWithStatus
      }
    }
  }

  // Chặn người dùng
  async blockedUser(user_id: string, friend_id: string) {
    const user = await models.User.findByPk(friend_id)

    if (!user) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Người dùng không tồn tại!')
    }

    const [currentFriendship, reverseFriendship] = await Promise.all([
      models.Friendship.findOne({ where: { user_id, friend_id } }),
      models.Friendship.findOne({ where: { user_id: friend_id, friend_id: user_id } })
    ])

    if (currentFriendship) {
      if (
        currentFriendship.status === RELATIONSHIP.FRIEND ||
        currentFriendship.status === RELATIONSHIP.PENDING_FRIEND_REQUEST
      ) {
        await currentFriendship.update({ status: RELATIONSHIP.BLOCKED })
      } else if (currentFriendship.status === RELATIONSHIP.BLOCKED) {
        throw new CustomErrorHandler(StatusCodes.CONFLICT, 'Người dùng này đã bị chặn!')
      } else {
        await currentFriendship.update({ status: RELATIONSHIP.BLOCKED })
      }
    } else {
      await models.Friendship.create({ user_id, friend_id, status: RELATIONSHIP.BLOCKED })
    }

    if (reverseFriendship && reverseFriendship.status === RELATIONSHIP.FRIEND) {
      await reverseFriendship.destroy()
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

    const blockFromUser = await models.Friendship.findOne({
      where: {
        user_id,
        friend_id,
        status: RELATIONSHIP.BLOCKED
      }
    })
if (!blockFromUser) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Hiện đang không chặn người dùng này!')
    }

    await blockFromUser.destroy()

    return {
      message: 'Hủy chặn người dùng thành công!',
      data: {}
    }
  }

  // Danh sách chặn người dùng
  async fetchAllListBlockUser(user_id: string) {
    const blockedUserRecords = await models.User.findByPk(user_id, {
      attributes: [],
      include: [
        {
          model: models.User,
          through: {
            attributes: [],
            where: {
              status: RELATIONSHIP.BLOCKED
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

    const blockedUsersList = blockedUserRecords?.Friends ?? []

    return {
      message: 'Danh sách chặn người dùng',
      data: {
        friends: blockedUsersList
      }
    }
  }
  // Tìm kiếm bạn bè
  async searchFriends(user_id: string, name: string) {
    const searchName = name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : ''

    const user = await models.User.findByPk(user_id, {
      attributes: [],
      include: [
        {
          model: models.User,
          through: { attributes: [], where: { status: RELATIONSHIP.FRIEND } },
          as: 'Friends',
          attributes: ['user_id', 'first_name', 'last_name'],
          where: {
            [Op.or]: [
              {
                last_name: {
                  [Op.like]: `${searchName}%`
                }
              },
              {
                first_name: {
                  [Op.like]: `${searchName}%`
                }
              }
            ]
          },
          include: [
            {
              model: models.Profile,
              attributes: ['profile_picture', 'cover_photo']
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

  // Lấy danh sách hình ảnh & video
  async getAllMediaResource(user_id: string) {
const posts = await models.Post.findAll({
      where: { user_id }
    })

    const postIds = await models.Post.findAll({
      where: { user_id },
      attributes: ['post_id']
    }).then((posts) => posts.map((post) => post.post_id))

    const media_resources = await models.PostMediaResource.findAll({
      where: { post_id: postIds }
    })

    return {
      message: 'Danh sách hình ảnh và video',
      data: {
        media_resources
      }
    }
  }
}

export default new userService()
