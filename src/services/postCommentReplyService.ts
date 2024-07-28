import { StatusCodes } from 'http-status-codes'
import models from '../db/models'
import { PostCommentReplyInput } from '../types/postCommentReply.type'
import { CustomErrorHandler } from '../utils/ErrorHandling'

class postCommentReplyService {
  // Danh sách trả lời bình luận
  async getAllPostCommentReplies() {
    const postCommentReplies = await models.PostCommentReply.findAll({
      order: [['createdAt', 'DESC']]
    })

    return {
      message: 'Danh sách trả lời bình luận',
      data: {
        comment_replies: postCommentReplies
      }
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
}

export default new postCommentReplyService()
