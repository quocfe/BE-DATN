import { StatusCodes } from 'http-status-codes'
import models from '../db/models'
import { CustomErrorHandler } from '../utils/ErrorHandling'
import { PostCommentInput, PostCommentType } from '../types/postComment.type'
import { deleteImageOrVideoByPublicId, getPublicIdFromUrl } from '../utils/cloudinary'

class postCommentService {
  // Danh sách bình luận bài đăng
  async getAllPostComments(post_id: string) {
    const isPostExisting = await models.Post.findByPk(post_id)

    if (!isPostExisting) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại bài đăng!')
    }

    const userAttributes = ['user_id', 'first_name', 'last_name']
    const includeUserWithProfile = (asAlias: string) => ({
      model: models.User,
      as: asAlias,
      attributes: userAttributes,
      include: [{ model: models.Profile, attributes: ['profile_picture'] }]
    })

    const comments = await models.PostComment.findAll({
      where: { post_id },
      include: [includeUserWithProfile('user_comment')],
      order: [['createdAt', 'DESC']]
    })

    return {
      message: 'Danh sách bình luận bài đăng',
      data: {
        comments
      }
    }
  }

  // Thêm mới bình luận bài đăng
  async addNewPostComment(post_id: string, user_id: string, dataPostComment: PostCommentInput) {
    const isPostExists = await models.Post.findByPk(post_id)

    if (!isPostExists) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại bài đăng!')
    }

    const { content, media_url } = dataPostComment

    const newPostComment = await models.PostComment.create({
      post_id,
      user_id,
      content,
      media_url
    })

    return {
      message: 'Thêm bình luận bài đăng thành công',
      data: {
        comment: newPostComment
      }
    }
  }

  // Xóa bình luận bài đăng
  async deletePostComment(comment_id: string) {
    const comment = await models.PostComment.findByPk(comment_id)

    if (!comment) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại bình luận bài viết!')
    }

    await comment.destroy()

    return {
      message: 'Xóa bình luận bài đăng thành công',
      data: {
        comment
      }
    }
  }

  // Chỉnh sửa bình luận bài đăng
  async updatePostComment(comment_id: string, dataPostComment: PostCommentInput) {
    const comment = await models.PostComment.findByPk(comment_id)

    if (!comment) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại bình luận bài đăng!')
    }

    const { content, media_url } = dataPostComment

    if (media_url === '') {
      await comment.update({ content })
    } else {
      if (comment.media_url) {
        const public_id = getPublicIdFromUrl(comment.media_url)
        deleteImageOrVideoByPublicId(public_id)
      }
      await comment.update({ content, media_url })
    }

    return {
      message: 'Cập nhật bình luận thành công!',
      data: {
        comment
      }
    }
  }
}

export default new postCommentService()
