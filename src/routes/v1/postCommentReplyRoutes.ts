import { Router } from 'express'
import Middleware from '../../middleware'
import { tryCatch } from '../../utils/response'
import postCommentReplyController from '../../controllers/postCommentReplyController'
import uploadCloud from '../../middleware/uploader'

const router = Router()

router.get(
  '/list/:comment_id',
  Middleware.verifyToken,
  tryCatch(postCommentReplyController.getAllPostCommentRepliesByCommentId)
)

router.post(
  '/add/:comment_id',
  Middleware.verifyToken,
  uploadCloud.single('media'),
  tryCatch(postCommentReplyController.addNewPostCommentReply)
)

router.delete(
  '/delete/:comment_reply_id',
  Middleware.verifyToken,
  tryCatch(postCommentReplyController.deletePostCommentReply)
)

export default router
