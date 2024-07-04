import { Router } from 'express'
import { API_V1 } from '../../constants/apiPaths'
import commonRoutes from './commonRoutes'
import userRoutes from './userRoutes'
import interestRoutes from './interestRoutes'
import videoRouter from './videoRoutes'
import likeVideoRoute from './likeVideoRoutes'
import commentVideoRoute from './commentVideoRoutes'
import favoriteVideoRoute from './favoriteVideoRoutes'

const router = Router()

router.use(API_V1.common, commonRoutes)
router.use(API_V1.user, userRoutes)
router.use(API_V1.interest, interestRoutes)
router.use(API_V1.videos, videoRouter)
router.use(API_V1.likeVideo, likeVideoRoute)
router.use(API_V1.commentVideo, commentVideoRoute)
router.use(API_V1.favoriteVideo, favoriteVideoRoute)

export default router
