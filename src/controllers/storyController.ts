import { Response, Request } from 'express'
import storyService from '../services/storyService'
import { sendResponseSuccess } from '../utils/response'
import { StoryInput } from '../types/story.type'
import { CustomErrorHandler } from '../utils/ErrorHandling'
import { StatusCodes } from 'http-status-codes'

class storyController {
    // Danh sách tin
  async fetchAllStory(req: Request, res: Response) {
    if(req.user) {
      const user_id = req.user.user_id
      const data = await storyService.fetchAllStory(user_id)
      sendResponseSuccess(res, data)
    }
  }
  // THêm mới tin
  async addNewStory(req: Request, res: Response) {
    if (req.user) {
      const { user_id } = req.user
      const storyData = req.body
      const data = await storyService.addNewStory(storyData, user_id)
      sendResponseSuccess(res, data)
    } else {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không thêm được tin!')
    }
  }
  // update story 
  async updateStory(req: Request, res: Response) {
    if (req.user) {
      const { user_id } = req.user
      const { storyId } = req.params
      const storyData: StoryInput = req.body
      const data = await storyService.updateStory(storyId, user_id, storyData)
      sendResponseSuccess(res, data)
    } else {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không cập nhật được tin!')
    }
  }
   // Xóa Story
   async deleteStory(req: Request, res: Response) {
    if (req.user) {
      const { user_id } = req.user
      const { storyId } = req.params
      const data = await storyService.deleteStory(storyId, user_id)
      sendResponseSuccess(res, data)
    } else {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không xóa được tin!')
    }
  }
   // Chi tiết tin
   async storyDetail(req: Request, res: Response) {
    const { storyId } = req.params
    const data = await storyService.storyDetail(storyId)
    sendResponseSuccess(res, data)
  }
}
export default new storyController()
