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
import userService from './userService'

class authService {
  constructor(
    private secretKey = process.env.JWT_SECRET_KEY as string,
    private expiresAccessToken = process.env.EXPIRES_ACCESS_TOKEN as string,
    private expiresRefreshToken = process.env.EXPIRES_REFRESH_TOKEN as string
  ) {}

  // Đăng nhập
  async login(data: LoginInput) {
    const { email, password } = data

    const existsUser = await models.User.findOne({
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
    })

    if (!existsUser) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, {
        email: 'Email không tồn tại!'
      })
    }

    if (!compareValue(password, existsUser.password)) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, {
        password: 'Mật khẩu không chính xác!'
      })
    }

    if (existsUser.is_auth === false) {
      throw new CustomErrorHandler(StatusCodes.FORBIDDEN, {
        email: 'Xác thực email của bạn!'
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
      message: 'Đăng nhập thành công.',
      data: {
        user,
        access_token: `Bearer ${access_token}`
      },
      refresh_token
    }
  }

  // Đăng ký
  async register(data: RegisterInput) {
    data.password = hashValue(data.password)
    const code = generateCodeNumbers(6).toString()
    const expires = generateExpiration(2, 'minutes')

    const [user, created] = await models.User.findOrCreate({
      where: { email: data.email },
      defaults: { ...data, code, expires }
    })

    if (!created) {
      throw new CustomErrorHandler(StatusCodes.CONFLICT, 'Email này đã tồn tại!')
    }

    try {
      const dataSendMail = await emailService.sendEmail(emailTitles.emailAuthentication, data.email, code)

      await models.Profile.create({ user_id: user.user_id })

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
