import { Router } from 'express'
import Middleware from '../../middleware'
import { tryCatch } from '../../utils/response'
import postCommentController from '../../controllers/postCommentController'
import uploadCloud from '../../middleware/uploader'

const router = Router()

router.get('/list/:post_id', Middleware.verifyToken, tryCatch(postCommentController.getAllPostComments))

router.post(
  '/add/:post_id',
  Middleware.verifyToken,
  uploadCloud.single('media'),
  tryCatch(postCommentController.addNewPostComment)
)

router.delete('/delete/:comment_id', Middleware.verifyToken, tryCatch(postCommentController.deletePostComment))

router.put(
  '/update/:comment_id',
  Middleware.verifyToken,
  uploadCloud.single('media'),
  tryCatch(postCommentController.updatePostComment)
)

export default router
