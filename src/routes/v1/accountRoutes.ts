import { Router } from 'express'
import Middleware from '../../middleware'
import { tryCatch } from '../../utils/response'
import accountController from '../../controllers/accountController'

const router = Router()

router.get('/list', Middleware.verifyTokenAdminRole(['Super Admin']), tryCatch(accountController.getAllAccounts))

router.post(
  '/update/:account_id',
  Middleware.verifyTokenAdminRole(['Super Admin']),
  tryCatch(accountController.updateAccount)
)

export default router
