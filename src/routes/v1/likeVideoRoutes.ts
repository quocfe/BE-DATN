import { Router } from 'express'
import middleware from '../../middleware'
import { getlikeCountVideoItem, getlikeVideoItem, likeVideo } from '../../controllers/likeVideoController'

const likeVideoRoute = Router()

// GET Like Video Item
likeVideoRoute.get('/:video_id', middleware.verifyToken, getlikeVideoItem)

// GET Like Count Video Item
likeVideoRoute.get('/count/:video_id', middleware.verifyToken, getlikeCountVideoItem)

// PATCH - Update and destroy like
likeVideoRoute.patch('/:video_id', middleware.verifyToken, likeVideo)

export default likeVideoRoute
