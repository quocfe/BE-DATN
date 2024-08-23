import { Router } from 'express'
import { tryCatch } from '../../utils/response'
import storyController from '../../controllers/storyController'
import Middleware from '../../middleware'

const router = Router()
router.get('/list', Middleware.handleValidatorError, Middleware.verifyToken, tryCatch(storyController.fetchAllStory))
router.post('/add', Middleware.handleValidatorError, Middleware.verifyToken, tryCatch(storyController.addNewStory))

router.post('/view', Middleware.handleValidatorError, Middleware.verifyToken, tryCatch(storyController.countViewStory))

router.put(
  '/archive/:storyId',
  Middleware.handleValidatorError,
  Middleware.verifyToken,
  tryCatch(storyController.moveToArchive)
)
router.put(
  '/unarchive/:storyId',
  Middleware.handleValidatorError,
  Middleware.verifyToken,
  tryCatch(storyController.unarchiveStory)
);
router.get(
  '/listArchive',
  Middleware.handleValidatorError,
  Middleware.verifyToken,
  tryCatch(storyController.fetchArchivedStories)
);
router.delete(
  '/delete/:storyId',
  Middleware.handleValidatorError,
  Middleware.verifyToken,
  tryCatch(storyController.deleteStory)
)

router.put(
  '/update/:storyId',
  Middleware.handleValidatorError,
  Middleware.verifyToken,
  tryCatch(storyController.updateStory)
)

router.get(
  '/detail/:storyId',
  Middleware.handleValidatorError,
  Middleware.verifyToken,
  tryCatch(storyController.storyDetail)
)

export default router
