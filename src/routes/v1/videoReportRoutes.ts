import { Router } from 'express'
import middleware from '../../middleware'
import { getCheckReportVideo, updateReportVideo } from '../../controllers/videoReportController'

const videoReportRouter = Router()

// CREATE VIDEO REPORT AND DELETE REPORT
videoReportRouter.patch('/:video_id', middleware.verifyToken, updateReportVideo)

videoReportRouter.post('/check/:video_id', middleware.verifyToken, getCheckReportVideo)

export default videoReportRouter
