import { Router } from 'express'
import middleware from '../../middleware'
import { createFavoriteVideo, getFavoriteVideo, getFavoriteVideoItem } from '../../controllers/favoriteVideoController'

const favoriteVideoRoute = Router()

favoriteVideoRoute.get('/', middleware.verifyToken, getFavoriteVideo)

favoriteVideoRoute.patch('/:video_id', middleware.verifyToken, createFavoriteVideo)

favoriteVideoRoute.get('/:video_id', middleware.verifyToken, getFavoriteVideoItem)

export default favoriteVideoRoute
