import { Router } from 'express'
import { API_V1 } from '../../constants/apiPaths'
import commonRoutes from './commonRoutes'
import userRoutes from './userRoutes'
import interestRoutes from './interestRoutes'
import fanpageRoutes from './fanpageRoutes'
import messageRoutes from './messageRoutes'
import notifyMessageRoutes from './notifyMessage'
import postRoutes from './postRoutes'
import postCommentRoutes from './postCommentRoutes'
import postCommentReplyRoutes from './postCommentReplyRoutes'
import postReactionRoutes from './postReactionRoutes'
import roleRoutes from './roleRoutes'
import permissionRoutes from './permissionRoutes'
import accountRoutes from './accountRoutes'
import moduleRoutes from './moduleRoutes'

const router = Router()

router.use(API_V1.common, commonRoutes)
router.use(API_V1.user, userRoutes)
router.use(API_V1.interest, interestRoutes)
router.use(API_V1.fanpage, fanpageRoutes)
router.use(API_V1.message, messageRoutes)
router.use(API_V1.notifymessage, notifyMessageRoutes)
router.use(API_V1.post, postRoutes)
router.use(API_V1.post_comment, postCommentRoutes)
router.use(API_V1.post_comment_reply, postCommentReplyRoutes)
router.use(API_V1.post_reaction, postReactionRoutes)
router.use(API_V1.role, roleRoutes)
router.use(API_V1.permission, permissionRoutes)
router.use(API_V1.account, accountRoutes)
router.use(API_V1.module, moduleRoutes)

export default router
