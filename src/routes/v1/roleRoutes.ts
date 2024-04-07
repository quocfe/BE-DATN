import { Router } from 'express'
import roleController from '../../controllers/roleController'
import RoleValidator from '../../middleware/validators/RoleValidator'
import Middleware from '../../middleware'
import { tryCatch } from '../../utils/response'
const router = Router()

router.get('/list', tryCatch(roleController.getAllRoles))

router.post(
  '/add',
  RoleValidator.checkAddRole(),
  Middleware.handleValidatorError,
  Middleware.verifyToken,
  tryCatch(roleController.addNewRole)
)

export default router
