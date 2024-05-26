import { Router } from 'express'
import { API_V1 } from '../../constants/apiPaths'
import commonRoutes from './commonRoutes'
import userRoutes from './userRoutes'
import interestRoutes from './interestRoutes'
import messageRoutes from './messageRoutes'

const router = Router()

router.use(API_V1.common, commonRoutes)
router.use(API_V1.user, userRoutes)
router.use(API_V1.interest, interestRoutes)
router.use(API_V1.message, messageRoutes)

export default router
