import { StatusCodes } from 'http-status-codes'
import models from '../db/models'
import { PostReactionInput } from '../types/postReaction.type'
import { CustomErrorHandler } from '../utils/ErrorHandling'

class postReactionService {
  // Thêm mới lượt tương tác
  async addNewPostReaction(post_id: string, user_id: string, dataPostReaction: PostReactionInput) {
    const { type } = dataPostReaction

    const [post, reaction] = await Promise.all([
      models.Post.findByPk(post_id),
      models.PostReaction.findOne({
        where: {
          post_id,
          user_id
        }
      })
    ])

    if (!post) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại bài đăng!')
    }

    if (reaction) {
      throw new CustomErrorHandler(StatusCodes.CONFLICT, 'Tồn tại tương tác với bài đăng này!')
    }

    const newPostReaction = await models.PostReaction.create({
      post_id,
      user_id,
      type
    })

    return {
      message: 'Thêm mới lượt tương tác thành công',
      data: {
        reaction: newPostReaction
      }
    }
  }

  // Hủy tương tác bài viết
  async cancelPostReaction(post_id: string, user_id: string) {
    const isPostInteracted = await models.PostReaction.findOne({
      where: { post_id, user_id }
    })

    if (!isPostInteracted) {
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Không tồn tại tương tác!')
    }

    await isPostInteracted.destroy()

    return {
      message: 'Hủy tương tác bài viết thành công',
      data: {
        reaction: isPostInteracted
      }
    }
  }

  // Cập nhật tương tác
  async updateInteraction(post_id: string, user_id: string, dataPostReaction: PostReactionInput) {
    const reaction = await models.PostReaction.findOne({
      where: { post_id, user_id }
    })

    if (!reaction) {
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Không tồn tại tương tác!')
    }

    await reaction.update({
      type: dataPostReaction.type
    })

    return {
      message: 'Cập nhật tương tác thành công',
      data: {
        reaction
      }
    }
  }
}

export default new postReactionService()
