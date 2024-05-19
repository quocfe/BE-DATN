import { Router } from 'express'
import { tryCatch } from '../../utils/response'
import interestController from '../../controllers/interestController'
import Middleware from '../../middleware'
import InterestValidator from '../../middleware/validators/InterestValidator'

const router = Router()

router.get('/list', tryCatch(interestController.fetchAllInterests))

router.post(
  '/add',
  InterestValidator.checkInterestInput(),
  Middleware.handleValidatorError,
  tryCatch(interestController.addNewInterest)
)

router.delete('/delete/:interest_id', tryCatch(interestController.deleteInterest))

router.put(
  '/update/:interest_id',
  InterestValidator.checkInterestInput(),
  Middleware.handleValidatorError,
  tryCatch(interestController.updateInterest)
)

router.post(
  '/search',
  InterestValidator.checkInterestInput(),
  Middleware.handleValidatorError,
  tryCatch(interestController.searchInterest)
)

export default router
