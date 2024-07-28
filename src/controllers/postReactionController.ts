import { Request, Response } from 'express'
import { PostReactionInput } from '../types/postReaction.type'
import postReactionService from '../services/postReactionService'
import { sendResponseSuccess } from '../utils/response'

class postReactionController {
  // Thêm mới lượt tương tác
  async addNewPostReaction(req: Request, res: Response) {
    if (req.user) {
      const user_id = req.user.user_id
      const { post_id } = req.params
      const dataPostReaction: PostReactionInput = req.body

      const data = await postReactionService.addNewPostReaction(post_id, user_id, dataPostReaction)

      sendResponseSuccess(res, data)
    }
  }

  // Hủy tương tác bài viết
  async cancelPostReaction(req: Request, res: Response) {
    if (req.user) {
      const user_id = req.user?.user_id
      const { post_id } = req.params

      const data = await postReactionService.cancelPostReaction(post_id, user_id)

      sendResponseSuccess(res, data)
    }
  }

  // Cập nhật tương tác
  async updateInteraction(req: Request, res: Response) {
    if (req.user) {
      const user_id = req.user.user_id
      const { post_id } = req.params
      const dataPostReaction: PostReactionInput = req.body

      const data = await postReactionService.updateInteraction(post_id, user_id, dataPostReaction)

      sendResponseSuccess(res, data)
    }
  }
}

export default new postReactionController()
