import { Router } from 'express'
import middleware from '../../middleware'
import { updateReportVideo } from '../../controllers/videoReportController'

const videoReportRouter = Router()

// CREATE VIDEO REPORT AND DELETE REPORT
videoReportRouter.patch('/:video_id', middleware.verifyToken, updateReportVideo)

export default videoReportRouter
