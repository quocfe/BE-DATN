import { Router } from 'express'
import Middleware from '../../middleware'
import { tryCatch } from '../../utils/response'
import postController from '../../controllers/postController'
import uploadCloud from '../../middleware/uploader'

const router = Router()

router.get('/my_post', Middleware.verifyToken, tryCatch(postController.getAllPosts))

router.get('/user_post/:target_id', Middleware.verifyToken, tryCatch(postController.getAllUserPosts))

router.get('/post_friend_and_pending', Middleware.verifyToken, tryCatch(postController.getAllFriendAndPendingPosts))

router.get('/post_fanpage/:fanpage_id', Middleware.verifyToken, tryCatch(postController.getAllFanpagePosts))

router.post(
  '/add',
  Middleware.verifyToken,
  uploadCloud.fields([
    { name: 'images', maxCount: 5 },
    { name: 'videos', maxCount: 2 }
  ]),
  tryCatch(postController.addNewPost)
)

router.delete('/delete/:post_id', Middleware.verifyToken, tryCatch(postController.deletePost))

router.post('/update/:post_id', Middleware.verifyToken, tryCatch(postController.updatePost))

export default router
