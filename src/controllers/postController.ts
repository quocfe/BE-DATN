import { Request, Response } from 'express'
import { PostInput } from '../types/post.type'
import { sendResponseSuccess } from '../utils/response'
import postService from '../services/postService'
import { CustomRequest } from '../types/custom.type'

class postController {
  // Danh sách bài đăng
  async getAllPosts(req: Request, res: Response) {
    if (req.user) {
      const { _page, _limit } = req.query
      const page = typeof _page === 'string' ? +_page : undefined
      const limit = typeof _limit === 'string' ? +_limit : undefined

      const user_id = req.user.user_id
      const data = await postService.getAllPosts(user_id, page, limit)

      sendResponseSuccess(res, data)
    }
  }

  async getAllUserPosts(req: Request, res: Response) {
    if (req.user) {
      const { _page, _limit } = req.query
      const page = typeof _page === 'string' ? +_page : undefined
      const limit = typeof _limit === 'string' ? +_limit : undefined
      const user_id = req.user.user_id
      const { target_id } = req.params

      const data = await postService.getAllPosts(user_id, page, limit, target_id)

      sendResponseSuccess(res, data)
    }
  }

  async getAllFriendAndPendingPosts(req: Request, res: Response) {
    if (req.user) {
      const { _page, _limit } = req.query
      const page = typeof _page === 'string' ? +_page : undefined
      const limit = typeof _limit === 'string' ? +_limit : undefined
      const user_id = req.user.user_id

      const data = await postService.getAllPosts(user_id, page, limit, null, true)

      sendResponseSuccess(res, data)
    }
  }

  async getAllFanpagePosts(req: Request, res: Response) {
    if (req.user) {
      const { _page, _limit } = req.query
      const page = typeof _page === 'string' ? +_page : undefined
      const limit = typeof _limit === 'string' ? +_limit : undefined
      const { fanpage_id } = req.params

      const data = await postService.getAllPosts('', page, limit, null, false, 'fanpage', fanpage_id)

      sendResponseSuccess(res, data)
    }
  }

  // Thêm bài đăng mới
  async addNewPost(req: CustomRequest, res: Response) {
    if (req.user) {
      const user_id = req.user.user_id
      const postData: PostInput = req.body
      const files = req.files
      const images = files?.images ?? []
      const videos = files?.videos ?? []

      const data = await postService.addNewPost(postData, user_id, images, videos)

      sendResponseSuccess(res, data)
    }
  }

  // Xóa bài đăng
  async deletePost(req: CustomRequest, res: Response) {
    if (req.user) {
      const { post_id } = req.params

      const data = await postService.deletePost(post_id)

      sendResponseSuccess(res, data)
    }
  }

  // Cập nhật bài đăng
  async updatePost(req: CustomRequest, res: Response) {
    if (req.user) {
      const { post_id } = req.params
      const postData = req.body

      const data = await postService.updatePost(post_id, postData)

      sendResponseSuccess(res, data)
    }
  }
}

export default new postController()
