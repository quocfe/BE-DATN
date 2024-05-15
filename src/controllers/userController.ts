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
}

export default new userController()
