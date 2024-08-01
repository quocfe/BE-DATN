import { Router } from 'express'
import Middleware from '../../middleware'
import roleController from '../../controllers/roleController'

const router = Router()

router.get('/list', Middleware.verifyTokenAdminRole(['User Admin']), roleController.getAllRoles)

export default router
