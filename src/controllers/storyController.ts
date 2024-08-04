import { Response, Request } from 'express'
import storyService from '../services/storyService'
import { sendResponseSuccess } from '../utils/response'
import { StoryInput } from '../types/story.type'
import { CustomErrorHandler } from '../utils/ErrorHandling'
import { StatusCodes } from 'http-status-codes'

class storyController {
  // Danh sách tin
  async fetchAllStory(req: Request, res: Response) {
    if (req.user) {
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
  // Đếm view
  async countViewStory(req: Request, res: Response) {
    if (req.user) {
      const { story_id } = req.body
      console.log('story_id', story_id)
      const data = await storyService.countViewStory(story_id)
      sendResponseSuccess(res, data)
    } else {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không cập nhật Đếm!')
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
  //Chuyển vào mục lưu trữ
  async moveToArchive(req: Request, res: Response) {
    if (req.user) {
      const { user_id } = req.user
      const { storyId } = req.params
      console.log('Story ID:', storyId)
      const data = await storyService.moveToArchive(storyId, user_id)
      sendResponseSuccess(res, data)
    } else {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không di chuyển được tin vào mục lưu trữ!')
    }
  }
  // Khôi phục tin đã lưu trữ
  async unarchiveStory(req: Request, res: Response) {
    if (req.user) {
      const { user_id } = req.user
      const { storyId } = req.params
      const data = await storyService.unarchiveStory(storyId, user_id)
      sendResponseSuccess(res, data)
    } else {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không khôi phục được tin từ mục lưu trữ!')
    }
  }
  //Lấy danh sách tin đã lưu trữ
  async fetchArchivedStories(req: Request, res: Response) {
    if (req.user) {
      const user_id = req.user.user_id
      const data = await storyService.fetchArchivedStories(user_id)
      sendResponseSuccess(res, data)
    } else {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không lấy được danh sách tin đã lưu trữ!')
    }
  }
}
export default new storyController()
