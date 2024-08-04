import { Request, Response } from 'express'
import postCommentService from '../services/postCommentService'
import { sendResponseSuccess } from '../utils/response'
import { PostCommentInput } from '../types/postComment.type'

class postCommentController {
  // Danh sách bình luận bài đăng
  async getAllPostComments(req: Request, res: Response) {
    const { post_id } = req.params

    const data = await postCommentService.getAllPostComments(post_id)

    sendResponseSuccess(res, data)
  }

  // Thêm mới bình luận bài đăng
  async addNewPostComment(req: Request, res: Response) {
    if (req.user) {
      const user_id = req.user.user_id
      const { post_id } = req.params
      const dataPostComment: PostCommentInput = req.body
      const file = req.file

      if (file) {
        dataPostComment.media_url = file.path
      }

      const data = await postCommentService.addNewPostComment(post_id, user_id, dataPostComment)

      sendResponseSuccess(res, data)
    }
  }

  // Xóa bình luận bài đăng
  async deletePostComment(req: Request, res: Response) {
    const { comment_id } = req.params

    const data = await postCommentService.deletePostComment(comment_id)

    sendResponseSuccess(res, data)
  }

  // Chỉnh sửa bình luận bài đăng
  async updatePostComment(req: Request, res: Response) {
    if (req.user) {
      const { comment_id } = req.params
      const dataPostComment: PostCommentInput = req.body
      const file = req.file

      if (file) {
        dataPostComment.media_url = file.path
      } else {
        dataPostComment.media_url = ''
      }

      const data = await postCommentService.updatePostComment(comment_id, dataPostComment)

      sendResponseSuccess(res, data)
    }
  }
}

export default new postCommentController()
