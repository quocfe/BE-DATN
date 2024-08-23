import { Router } from 'express'
import Middleware from '../../middleware'
import { tryCatch } from '../../utils/response'
import notifyMessageController from '../../controllers/notifyMessageController'

const router = Router()

router.get('/getAllNotify', Middleware.verifyToken, tryCatch(notifyMessageController.getAllNotify))
router.delete('/deleteNotify/:id', Middleware.verifyToken, tryCatch(notifyMessageController.deleteNotify))
// router.post('/createNotify', Middleware.verifyToken, tryCatch(notifyMessageController.createNotify))
//  ------------------- //

export default router
