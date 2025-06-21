import { Op } from 'sequelize'
import models from '../db/models'
import { PostInput, PostUpdate } from '../types/post.type'
import postMediaResourceService from './postMediaResourceService'
import { CustomErrorHandler } from '../utils/ErrorHandling'
import { StatusCodes } from 'http-status-codes'

class postService {
  // Thêm tài nguyên vào bài đăng
  private async addPostMediaResources(post_id: string, mediaFiles: Express.Multer.File[], type: 'image' | 'video') {
    if (mediaFiles.length) {
      for (const file of mediaFiles) {
        const url = file.path
        await postMediaResourceService.addPostMediaResource(post_id, url, type)
      }
    }
  }

  // Danh sách bài đăng
  async getAllPosts(
    user_id: string,
    page: number | undefined,
    limit: number | undefined,
    target_id: string | null = null,
    includePending: boolean = false,
    type: string = 'user',
    fanpage_id?: string
  ) {
    const offset = page && limit ? (page - 1) * limit : undefined
    const excludeTimestamps = { exclude: ['updatedAt'] }
    const userAttributes = ['user_id', 'first_name', 'last_name']

    const includeUserWithProfile = (asAlias: string) => ({
      model: models.User,
      as: asAlias,
      attributes: userAttributes,
      include: [{ model: models.Profile, attributes: ['profile_picture'] }]
    })

    const includeCommentReplies = {
      model: models.PostCommentReply,
      as: 'comment_replies',
      attributes: excludeTimestamps,
      include: [includeUserWithProfile('user_reply'), includeUserWithProfile('replied_to_user')]
    }

    const includeComments = {
      model: models.PostComment,
      as: 'comments',
      attributes: excludeTimestamps,
      include: [includeUserWithProfile('user_comment'), includeCommentReplies]
    }

    const includeReactions = {
      model: models.PostReaction,
      as: 'reactions',
      attributes: excludeTimestamps,
      include: [includeUserWithProfile('user_reaction')]
    }

    const whereCondition: {
      user_id?: string | { [Op.in]: string[] }
      fanpage_id?: string | { [Op.in]: string[] }
      privary?: string | object
      post_type: string
    } = {
      post_type: type
    }

    if (type === 'user') {
      whereCondition.user_id = target_id ? target_id : user_id
    } else if (type === 'fanpage') {
      whereCondition.fanpage_id = fanpage_id
    }

    // Kiểm tra mối quan hệ với người này
    if (target_id) {
      const existingRequest = await models.Friendship.findOne({
        where: {
          [Op.or]: [
            {
              user_id,
              friend_id: target_id,
              status: 'Đã chấp nhận'
            },
            {
              user_id: target_id,
              friend_id: user_id,
              status: 'Đã chấp nhận'
            }
          ]
        }
      })

      if (existingRequest) {
        whereCondition.privary = {
          [Op.or]: ['friends', 'public']
        }
      } else {
        whereCondition.privary = 'public'
      }
    }

    // Nếu includePending là true, lấy thêm bài đăng của bạn bè và người đang chờ kết bạn
    if (includePending) {
      const friendsAndPendingRequests = await models.Friendship.findAll({
        where: {
          user_id,
          status: {
            [Op.or]: ['Đã chấp nhận', 'Chờ chấp nhận']
          }
        },
        attributes: ['friend_id']
      }).then((friends) => friends.map((friend) => friend.friend_id))

      // Lấy cả bài đăng của người dùng, bạn bè và những người đang chờ kết bạn
      whereCondition.user_id = {
        [Op.in]: [user_id, ...friendsAndPendingRequests]
      }

      // Chỉ lấy bài đăng public và friends của bạn bè
      whereCondition.privary = {
        [Op.or]: ['friends', 'public']
      }
    }

    const postIds = await models.Post.findAll({
      where: whereCondition,
      attributes: ['post_id'],
      order: [['createdAt', 'DESC']]
    }).then((posts) => posts.map((post) => post.post_id))

    let posts = await models.Post.findAll({
      where: {
        post_id: {
          [Op.in]: postIds
        }
      },
      include: [
        {
          model: models.PostMediaResource,
          as: 'media_resources',
          attributes: excludeTimestamps
        },
        includeComments,
        includeReactions,
        includeUserWithProfile('author')
      ],
      offset,
      limit,
      order: [
        ['createdAt', 'DESC'],
        [{ model: models.PostComment, as: 'comments' }, 'createdAt', 'DESC'],
        [
          { model: models.PostComment, as: 'comments' },
          { model: models.PostCommentReply, as: 'comment_replies' },
          'createdAt',
          'DESC'
        ]
      ]
    })

    const fanpage = await models.Fanpage.findByPk(fanpage_id)

    // Đếm tổng bài đăng
    const total = await models.Post.count({
      where: {
        post_id: {
          [Op.in]: postIds
        }
      }
    })

    // Đếm tổng số trang
    const pages = limit ? Math.ceil(total / limit) : 1

    // Ánh xạ
    const sortedPosts = postIds
      .map((postId) => posts.find((post) => post.post_id === postId))
      .filter((post) => post !== undefined)

    const message = target_id !== null ? 'Danh sách bài đăng của người dùng' : 'Danh sách bài đăng của tôi.'

    return {
      message,
      data: {
        posts: sortedPosts,
        fanpage,
        total,
        pages
      }
    }
  }

  // Thêm bài đăng mới
  async addNewPost(data: PostInput, user_id: string, images: Express.Multer.File[], videos: Express.Multer.File[]) {
    const fanpage_id = data.fanpage_id

    const newPost = await models.Post.create({
      ...data,
      user_id,
      fanpage_id
    })

    const post_id = newPost.post_id

    await this.addPostMediaResources(post_id, images, 'image')
    await this.addPostMediaResources(post_id, videos, 'video')

    return {
      message: 'Thêm bài viết thành công',
      data: {
        post: newPost
      }
    }
  }

  async deletePost(post_id: string) {
    const post = await models.Post.findByPk(post_id)

    if (!post) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại bài đăng!')
    }

    await post.destroy()

    return {
      message: 'Xóa bài đăng thành công!',
      data: {
        post
      }
    }
  }

  async updatePost(post_id: string, postData: PostUpdate) {
    const post = await models.Post.findByPk(post_id)

    if (!post) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại bài đăng')
    }

    await post.update(postData)

    return {
      message: 'Cập nhật bài đăng thành công',
      data: {}
    }
  }
}

export default new postService()
