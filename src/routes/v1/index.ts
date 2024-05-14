import { Router } from 'express'
import commonRoutes from './commonRoutes'
import userRoutes from './userRoutes'
import { API_V1 } from '../../constants/apiPaths'
const router = Router()

router.use(API_V1.common, commonRoutes)
router.use(API_V1.user, userRoutes)

export default router
