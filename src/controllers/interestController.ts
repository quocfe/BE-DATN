import { Request, Response } from 'express'
import interestService from '../services/interestService'
import { InterestInput } from '../types/interest.type'
import { sendResponseSuccess } from '../utils/response'

class interestController {
  // Danh sách sở thích
  async fetchAllInterests(req: Request, res: Response) {
    const data = await interestService.fetchAllInterests()

    sendResponseSuccess(res, data)
  }

  // Thêm sở thích
  async addNewInterest(req: Request, res: Response) {
    const interest: InterestInput = req.body

    const data = await interestService.addNewInterest(interest)

    sendResponseSuccess(res, data)
  }

  // Cập nhật sở thích
  async updateInterest(req: Request, res: Response) {
    const { interest_id } = req.params
    const interest: InterestInput = req.body

    const data = await interestService.updateInterest(interest_id, interest)

    sendResponseSuccess(res, data)
  }

  // Xóa sở thích
  async deleteInterest(req: Request, res: Response) {
    const { interest_id } = req.params

    const data = await interestService.deleteInterest(interest_id)

    sendResponseSuccess(res, data)
  }

  // Tìm kiếm sở thích
  async searchInterest(req: Request, res: Response) {
    const search: InterestInput = req.body

    const data = await interestService.searchInterest(search)

    sendResponseSuccess(res, data)
  }
}

export default new interestController()
