import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validationResult } from 'express-validator'
import { CustomErrorData } from '../types/response.type'
import { CustomErrorHandler } from '../utils/ErrorHandling'
import { sendResponseError } from '../utils/response'
import { UserOutput } from '../types/user.type'
import jwt from 'jsonwebtoken'

declare module 'express' {
  interface Request {
    user?: UserOutput
    // admin here
  }
}

class Middleware {
  // Xử lý lỗi express-validate
  handleValidatorError(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json(errors)
    }
    next()
  }

  // Xác thực token
  verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization
    if (token) {
      const accessToken = token.split(' ')[1]

      const secretKey = process.env.JWT_SECRET_KEY as string
      jwt.verify(accessToken, secretKey, (error, user) => {
        if (error)
          return sendResponseError(
            res,
            new CustomErrorHandler(StatusCodes.UNAUTHORIZED, {
              message: 'Token này đã hết hạn!',
              errorName: 'EXPIRED_TOKEN'
            })
          )

        req.user = user as UserOutput
        next()
      })
    } else {
      return sendResponseError(
        res,
        new CustomErrorHandler(StatusCodes.UNAUTHORIZED, {
          message: 'Chưa đăng nhập!!',
          errorName: 'MISSING_ACCESS_TOKEN'
        })
      )
    }
  }

  // Xác thực vai trò & permissions
  verifyTokenAdminRole(roles: string[] = [], requiredPermission?: string, requiredModule?: string) {
    if (typeof roles === 'string') {
      roles = [roles]
    }

    return [
      this.verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        const user = req.user
        console.log(user)

        // Nếu là Super Admin -> next full quyền
        if (user?.role?.name === 'Super Admin') {
          return next()
        }

        // không có vai trò hoặc vai trò không nằm trong list roles được cấp phép
        if (!user?.role || (roles.length && !roles.includes(user.role.name))) {
          return res.status(403).json({ message: 'Forbidden: Bạn không có quyền truy cập!' })
        }

        // Không yêu cầu quyền
        if (!requiredPermission || !requiredModule) {
          return next()
        }

        // Kiểm tra quyền truy cập vào module
        const hasPermission = user.modules?.some((module) => {
          return (
            module.name.toLowerCase() === requiredModule.toLowerCase() &&
            module.permissions.some((permission) => permission.name.toLowerCase() === requiredPermission.toLowerCase())
          )
        })

        if (!hasPermission) {
          return res.status(403).json({ message: 'Forbidden: Bạn không có quyền truy cập vào module này!' })
        }

        // Thỏa mãn niềm đam mê
        next()
      }
    ]
  }

  // Xử lý lỗi toàn cục
  errorHandling(error: string | CustomErrorData, req: Request, res: Response, next: NextFunction) {
    sendResponseError(res, error)
  }
}

export default new Middleware()
