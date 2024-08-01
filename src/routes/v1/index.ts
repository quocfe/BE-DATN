import { Router } from 'express'
import { API_V1 } from '../../constants/apiPaths'
import commonRoutes from './commonRoutes'
import userRoutes from './userRoutes'
import interestRoutes from './interestRoutes'
import postRoutes from './postRoutes'
import postCommentRoutes from './postCommentRoutes'
import postCommentReplyRoutes from './postCommentReplyRoutes'
import postReactionRoutes from './postReactionRoutes'
import roleRoutes from './roleRoutes'

const router = Router()

router.use(API_V1.common, commonRoutes)
router.use(API_V1.user, userRoutes)
router.use(API_V1.interest, interestRoutes)
router.use(API_V1.post, postRoutes)
router.use(API_V1.post_comment, postCommentRoutes)
router.use(API_V1.post_comment_reply, postCommentReplyRoutes)
router.use(API_V1.post_reaction, postReactionRoutes)
router.use(API_V1.role, roleRoutes)

export default router
