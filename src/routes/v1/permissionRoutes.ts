import { Router } from 'express'
import Middleware from '../../middleware'
import { tryCatch } from '../../utils/response'
import permissionController from '../../controllers/permissionController'

const router = Router()

router.get('/list', Middleware.verifyTokenAdminRole(['Super Admin']), tryCatch(permissionController.getAllPermissions))

router.post('/add', Middleware.verifyTokenAdminRole(['Super Admin']), tryCatch(permissionController.addNewPermission))

router.delete(
  '/delete/:permission_id',
  Middleware.verifyTokenAdminRole(['Super Admin']),
  tryCatch(permissionController.deletePermission)
)

export default router
