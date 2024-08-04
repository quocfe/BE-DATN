import { Request, Response } from 'express'
import accountService from '../services/accountService'
import { sendResponseSuccess } from '../utils/response'

class accountController {
  async getAllAccounts(req: Request, res: Response) {
    const data = await accountService.getAllAccounts()

    sendResponseSuccess(res, data)
  }

  async updateAccount(req: Request, res: Response) {
    const { account_id } = req.params
    const body = req.body

    const data = await accountService.updateAccount(account_id, body)

    sendResponseSuccess(res, data)
  }
}

export default new accountController()
