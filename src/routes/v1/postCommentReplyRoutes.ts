import { Router } from 'express'
import Middleware from '../../middleware'
import { tryCatch } from '../../utils/response'
import postCommentReplyController from '../../controllers/postCommentReplyController'
import uploadCloud from '../../middleware/uploader'

const router = Router()

router.get('/list', Middleware.verifyToken, tryCatch(postCommentReplyController.getAllPostCommentReplies))

router.post(
  '/add/:comment_id',
  Middleware.verifyToken,
  uploadCloud.single('media'),
  tryCatch(postCommentReplyController.addNewPostCommentReply)
)

export default router
