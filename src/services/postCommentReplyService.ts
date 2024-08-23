import { StatusCodes } from 'http-status-codes'
import models from '../db/models'
import { PostCommentReplyInput } from '../types/postCommentReply.type'
import { CustomErrorHandler } from '../utils/ErrorHandling'

class postCommentReplyService {
  // Danh sách trả lời bình luận
  async getAllPostCommentRepliesByCommentId(comment_id: string) {
    const isCommentExisting = await models.PostComment.findByPk(comment_id)

    if (!isCommentExisting) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại bình luận!')
    }

    const userAttributes = ['user_id', 'first_name', 'last_name']
    const includeUserWithProfile = (asAlias: string) => ({
      model: models.User,
      as: asAlias,
      attributes: userAttributes,
      include: [{ model: models.Profile, attributes: ['profile_picture'] }]
    })

    const comment_replies = await models.PostCommentReply.findAll({
      where: { comment_id },
      include: [includeUserWithProfile('user_reply'), includeUserWithProfile('replied_to_user')],
      order: [['createdAt', 'DESC']]
    })

    return {
      message: 'Danh sách trả lời bình luận',
      data: { comment_replies }
    }
  }

  // Thêm mới trả lời bình luận
  async addNewPostCommentReply(comment_id: string, user_id: string, dataPostCommentReply: PostCommentReplyInput) {
    const { content, media_url, replied_to_user_id } = dataPostCommentReply
    const [comment, user] = await Promise.all([
      models.PostComment.findByPk(comment_id),
      models.User.findByPk(replied_to_user_id)
    ])

    if (!comment) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại bình luận này!')
    }

    if (!user) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại người dùng này!')
    }

    const newCommentReply = await models.PostCommentReply.create({
      content,
      media_url,
      comment_id,
      user_id,
      replied_to_user_id
    })

    return {
      message: 'Thêm mới trả lời bình luận thành công',
      data: {
        comment_reply: newCommentReply
      }
    }
  }

  async updatePostCommentReply(comment_reply_id: string, dataPostComment: PostCommentReplyInput) {}

  async deletePostCommentReply(comment_reply_id: string) {
    const postCommentReply = await models.PostCommentReply.findByPk(comment_reply_id)

    if (!postCommentReply) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại trả lời bình luận')
    }

    await postCommentReply.destroy()

    return {
      message: 'Xóa thành công trả lời bình luận',
      data: {
        postCommentReply
      }
    }
  }
}

export default new postCommentReplyService()
