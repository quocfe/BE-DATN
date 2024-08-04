import { Router } from 'express'
import Middleware from '../../middleware'
import roleController from '../../controllers/roleController'
import { tryCatch } from '../../utils/response'

const router = Router()

router.post(
  '/add',
  Middleware.verifyTokenAdminRole(['User Admin'], 'add', 'Role Management'),
  tryCatch(roleController.addNewRole)
)

router.get(
  '/list',
  Middleware.verifyTokenAdminRole(['User Admin'], 'view', 'Role Management'),
  tryCatch(roleController.getAllRoles)
)

router.delete('/delete/:role_id', Middleware.verifyTokenAdminRole(['User Admin']), tryCatch(roleController.deleteRole))

export default router
