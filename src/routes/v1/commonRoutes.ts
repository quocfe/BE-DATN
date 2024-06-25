import { Request, Response, Router } from 'express'
import Middleware from '../../middleware'
import authController from '../../controllers/authController'
import AuthValidator from '../../middleware/validators/AuthValidator'
import { tryCatch } from '../../utils/response'
import userController from '../../controllers/userController'
import models from '../../db/models'
const router = Router()

router.post('/login', AuthValidator.checkLogin(), Middleware.handleValidatorError, tryCatch(authController.login))

router.post(
  '/register',
  AuthValidator.checkRegister(),
  Middleware.handleValidatorError,
  tryCatch(authController.register)
)

router.post('/logout', tryCatch(authController.logout))

router.post('/refresh-access-token', tryCatch(authController.refreshAccessToken))

router.post('/verify/:email/:code', tryCatch(authController.verifyEmail))

router.post('/new_auth_code_email/:email', tryCatch(authController.newAuthCodeEmail))

router.get('/search_all/:name', Middleware.verifyToken, tryCatch(userController.searchUserOrFanpages))

router.post(
  '/admin/login',
  AuthValidator.checkLogin(),
  Middleware.handleValidatorError,
  tryCatch(authController.loginAdmin)
)

export default router
