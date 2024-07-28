import { Router } from 'express'
import middleware from '../../middleware'
import {
  addCommentVideo,
  deleteCommentItem,
  editCommentVideo,
  getCommentVideoItem,
  getCommentVideoPartentItem
} from '../../controllers/commentVideoController'

const commentVideoRoute = Router()

// POST: Comment Video Item
commentVideoRoute.post('/:video_id', middleware.verifyToken, addCommentVideo)

// GET: Comment Video Partent Item
commentVideoRoute.get('/partent/:comment_id', middleware.verifyToken, getCommentVideoPartentItem)

// GET: Commnet Video Item
commentVideoRoute.get('/:video_id', middleware.verifyToken, getCommentVideoItem)

// PATCH: Edit Commnet Video Item
commentVideoRoute.patch('/:video_id', middleware.verifyToken, editCommentVideo)

// DELETE: Delete Commnet Video Item
commentVideoRoute.delete('/:comment_id', middleware.verifyToken, deleteCommentItem)

export default commentVideoRoute
