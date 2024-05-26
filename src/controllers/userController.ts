import { NextFunction, Request, Response } from 'express'
import userService from '../services/userService'
import { sendResponseSuccess } from '../utils/response'
import { StatusCodes } from 'http-status-codes'
import { CustomErrorHandler } from '../utils/ErrorHandling'
import { ProfileInput } from '../types/profile.type'

class userController {
  // Lấy thông tin người dùng
  async getProfile(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
      const { user_id } = req.user

      const data = await userService.getProfile(user_id)

      sendResponseSuccess(res, data)
    } else {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại người dùng!')
    }
  }

  // Cập nhật hồ sơ người dùng
  async updateProfile(req: Request, res: Response) {
    if (req.user) {
      const { user_id } = req.user
      const dataProfileUpdate: ProfileInput = req.body

      const data = await userService.updateProfile(user_id, dataProfileUpdate)

      sendResponseSuccess(res, data)
    } else {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại người dùng!')
    }
  }

  // Lấy danh sách bạn bè
  async fetchFriendOfUser(req: Request, res: Response) {
    if (req.user) {
      const user_id = req.user.user_id

      const data = await userService.fetchFriendOfUser(user_id)

      sendResponseSuccess(res, data)
    } else {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại người dùng!')
    }
  }

  // Gửi lời mời kết bạn
  async sendFriendRequest(req: Request, res: Response) {
    if (req.user) {
      const user_id = req.user.user_id
      const { friend_id } = req.params

      const data = await userService.senderFriendRequest(user_id, friend_id)

      sendResponseSuccess(res, data)
    } else {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại người dùng!')
    }
  }

  // Danh sách lời mời kết bạn đã gửi
  async fetchAllSentFriendRequest(req: Request, res: Response) {
    if (req.user) {
      const user_id = req.user.user_id

      const data = await userService.fetchAllSentFriendRequest(user_id)

      sendResponseSuccess(res, data)
    } else {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại người dùng!')
    }
  }

  // Hủy lời mời kết bạn + Hủy kết bạn
  async cancelFriendRequest(req: Request, res: Response) {
    if (req.user) {
      const user_id = req.user.user_id
      const { friend_id } = req.params

      const data = await userService.cancelFriendRequest(user_id, friend_id)

      sendResponseSuccess(res, data)
    } else {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại người dùng!')
    }
  }

  // Danh sách người dùng đã gửi kết bạn tới tôi
  async fetchAllReceivedFriendRequest(req: Request, res: Response) {
    if (req.user) {
      const user_id = req.user.user_id

      const data = await userService.fetchAllReceivedFriendRequest(user_id)

      sendResponseSuccess(res, data)
    } else {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại người dùng!')
    }
  }

  // Chấp nhận lời mời kết bạn
  async acceptFriendRequest(req: Request, res: Response) {
    if (req.user) {
      const user_id = req.user.user_id
      const { friend_id } = req.params

      const data = await userService.acceptFriendRequest(user_id, friend_id)

      sendResponseSuccess(res, data)
    } else {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại người dùng!')
    }
  }

  // Chặn người dùng
  async blockedUser(req: Request, res: Response) {
    if (req.user) {
      const user_id = req.user.user_id
      const { friend_id } = req.params

      const data = await userService.blockedUser(user_id, friend_id)

      sendResponseSuccess(res, data)
    } else {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại người dùng!')
    }
  }

  // Hủy chặn người dùng
  async unblockedUser(req: Request, res: Response) {
    if (req.user) {
      const user_id = req.user.user_id
      const { friend_id } = req.params

      const data = await userService.unblockedUser(user_id, friend_id)

      sendResponseSuccess(res, data)
    } else {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại người dùng!')
    }
  }

  // Tìm kiếm người dùng hoặc fanpage
  async searchUserOrFanpage(req: Request, res: Response) {
    if (req.user) {
      const user_id = req.user.user_id
      const { name } = req.params

      const data = await userService.searchUserOrFanpage(user_id, name)

      sendResponseSuccess(res, data)
    } else {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại người dùng!')
    }
  }

  // Danh sách chặn người dùng
  async fetchAllListBlockUser(req: Request, res: Response) {
    if (req.user) {
      const user_id = req.user.user_id

      const data = await userService.fetchAllListBlockUser(user_id)

      sendResponseSuccess(res, data)
    } else {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại người dùng!')
    }
  }
}

export default new userController()
