import { Router } from 'express'
import Middleware from '../../middleware'
import { tryCatch } from '../../utils/response'
import moduleController from '../../controllers/moduleController'

const router = Router()

router.get('/list', Middleware.verifyTokenAdminRole(['Super Admin']), tryCatch(moduleController.getAllModules))

export default router
