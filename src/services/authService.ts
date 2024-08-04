import { Includeable } from 'sequelize'
import 'dotenv/config'
import _ from 'lodash'
import jwt from 'jsonwebtoken'
import { LoginInput, RegisterInput } from '../types/auth.type'
import { generateToken } from '../utils/jwt'
import { compareValue, hashValue } from '../utils/bcrypt'
import { StatusCodes } from 'http-status-codes'
import { CustomErrorHandler } from '../utils/ErrorHandling'
import { UserOutput } from '../types/user.type'
import models from '../db/models'
import emailService from './emailService'
import emailTitles from '../constants/email'
import { generateExpiration, generateCodeNumbers } from '../utils/utils'
import { AccountOuput } from '../types/account.type'
import { Modules } from '../types/module.type'
import { Permission } from '../types/permission.type'

class authService {
  constructor(
    private secretKey = process.env.JWT_SECRET_KEY as string,
    private expiresAccessToken = process.env.EXPIRES_ACCESS_TOKEN as string,
    private expiresRefreshToken = process.env.EXPIRES_REFRESH_TOKEN as string
  ) {}

  // Đăng nhập
  async login(data: LoginInput) {
    const { email, password } = data

    const [existsUser, existsAdmin] = await Promise.all([
      models.User.findOne({
        where: { email },
        include: [
          {
            model: models.Profile,
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          },
          {
            model: models.Interest,
            through: { attributes: [] },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          }
        ]
      }),
      models.Account.findOne({
        where: { email },
        include: [
          {
            model: models.Role,
            attributes: ['role_id', 'name'],
            as: 'role'
          },
          {
            model: models.Module,
            through: { attributes: [] },
            attributes: ['module_id', 'name'],
            as: 'modules',
            include: [
              {
                model: models.Permission,
                through: { attributes: [] },
                attributes: ['permission_id', 'name', 'display_name'],
                as: 'permissions'
              }
            ]
          }
        ]
      })
    ])

    if (!existsUser && !existsAdmin) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, {
        email: 'Email không tồn tại!'
      })
    }

    if (existsAdmin) {
      if (!compareValue(password, existsAdmin.password)) {
        throw new CustomErrorHandler(StatusCodes.NOT_FOUND, {
          password: 'Mật khẩu không chính xác!'
        })
      }

      const admin = _.omit(existsAdmin.toJSON(), 'password', 'createdAt', 'updatedAt') as {
        account_id: string
        email: string
        role?: {
          name: string
          description: string
        }
        modules?: Modules
      }

      console.log(admin.modules)

      const adminPayload: UserOutput = {
        user_id: admin.account_id,
        email: admin.email,
        role: admin.role,
        modules: admin.modules
      }

      const access_token = generateToken(adminPayload, this.secretKey, this.expiresAccessToken)

      const refresh_token = generateToken(adminPayload, this.secretKey, this.expiresRefreshToken)

      return {
        message: 'Đăng nhập thành công',
        data: {
          user: admin,
          access_token: `Bearer ${access_token}`,
          type: 'admin'
        },
        refresh_token
      }
    }

    if (existsUser) {
      if (!compareValue(password, existsUser.password)) {
        throw new CustomErrorHandler(StatusCodes.NOT_FOUND, {
          password: 'Mật khẩu không chính xác!'
        })
      }

      const user = _.omit(existsUser.toJSON(), 'password', 'code', 'is_auth', 'expires', 'createdAt', 'updatedAt')

      const userPayload: UserOutput = {
        user_id: user.user_id,
        email: user.email
      }

      const access_token = generateToken(userPayload, this.secretKey, this.expiresAccessToken)

      const refresh_token = generateToken(userPayload, this.secretKey, this.expiresRefreshToken)

      return {
        message: 'Đăng nhập thành công',
        data: {
          user,
          access_token: `Bearer ${access_token}`,
          type: 'client'
        },
        refresh_token
      }
    }

    return {
      message: '',
      data: {}
    }
  }

  // Đăng ký
  async register(data: RegisterInput) {
    data.password = hashValue(data.password)
    const code = generateCodeNumbers(6).toString()
    const expires = generateExpiration(2, 'minutes')

    const [_, created] = await models.User.findOrCreate({
      where: { email: data.email },
      defaults: { ...data, code, expires }
    })

    if (!created) {
      throw new CustomErrorHandler(StatusCodes.CONFLICT, 'Email này đã tồn tại!')
    }

    try {
      const dataSendMail = await emailService.sendEmail(emailTitles.emailAuthentication, data.email, code)

      return {
        message: emailTitles.emailAuthentication,
        data: {
          to: dataSendMail.accepted
        }
      }
    } catch (error) {
      await models.User.destroy({ where: { email: data.email } })
      throw new CustomErrorHandler(StatusCodes.CONFLICT, 'Lỗi không thể gửi được email!')
    }
  }

  // Refresh Access Token
  async refreshAccessToken(refresh_token: string) {
    if (!refresh_token) {
      throw new CustomErrorHandler(StatusCodes.UNAUTHORIZED, {
        message: 'Bạn chưa đăng nhập',
        errorName: 'UNAUTHORIZED'
      })
    }

    try {
      const decodeUser = (await jwt.verify(refresh_token, this.secretKey)) as UserOutput

      const access_token = generateToken(_.omit(decodeUser, ['iat', 'exp']), this.secretKey, this.expiresAccessToken)

      const new_refresh_token = generateToken(
        _.omit(decodeUser, ['iat', 'exp']),
        this.secretKey,
        this.expiresAccessToken
      )

      return {
        message: 'Refresh token thành công!',
        data: {
          access_token: `Bearer ${access_token}`
        },
        new_refresh_token
      }
    } catch (error) {
      throw new CustomErrorHandler(StatusCodes.UNAUTHORIZED, {
        message: 'Refresh token đã hết hạn. Vui lòng đăng nhập lại.',
        errorName: 'EXPIRED_REFRESH_TOKEN'
      })
    }
  }
}

export default new authService()
