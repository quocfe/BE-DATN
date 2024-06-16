import { Router } from 'express'
import middleware from '../../middleware'
import { getlikeVideoItem, likeVideo } from '../../controllers/likeVideoController'

const likeVideoRoute = Router()

// GET Like Video Item
likeVideoRoute.get('/:video_id', middleware.verifyToken, getlikeVideoItem)

// PATCH - Update and destroy like
likeVideoRoute.patch('/:video_id', middleware.verifyToken, likeVideo)

export default likeVideoRoute
