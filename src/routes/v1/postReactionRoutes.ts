import { Router } from 'express'
import Middleware from '../../middleware'
import { tryCatch } from '../../utils/response'
import postReactionController from '../../controllers/postReactionController'

const router = Router()

router.post('/add/:post_id', Middleware.verifyToken, tryCatch(postReactionController.addNewPostReaction))

router.delete('/delete/:post_id', Middleware.verifyToken, tryCatch(postReactionController.cancelPostReaction))

router.post('/update/:post_id', Middleware.verifyToken, tryCatch(postReactionController.updateInteraction))

export default router
