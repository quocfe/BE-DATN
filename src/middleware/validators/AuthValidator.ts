import { body } from 'express-validator'

class AuthValidator {
  checkLogin() {
    return [
      body('email').notEmpty().withMessage('Email không được để trống!').trim(),

      body('password').notEmpty().withMessage('Mật khẩu không được để trống!').trim()
    ]
  }

  checkRegister() {
    return [
      body('first_name').notEmpty().withMessage('Tên không được để trống').trim(),

      body('last_name').notEmpty().withMessage('Họ không được để trống').trim(),

      body('email').notEmpty().withMessage('Email không được để trống').isEmail().withMessage('Email không hợp lệ'),

      body('password').notEmpty().withMessage('Mật khẩu không được để trống').trim()
    ]
  }
}

export default new AuthValidator()
