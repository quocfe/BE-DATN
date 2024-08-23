import { StatusCodes } from 'http-status-codes'
import models from '../db/models'
import { StoryInput, StoryUpdate } from '../types/story.type'
import { CustomErrorHandler } from '../utils/ErrorHandling'
import userService from './userService'
import User from '../db/models/User'
import { where } from 'sequelize'
class storyService {
  getFullName = async (id: string) => {
    const user = await models.User.findOne({
      where: {
        user_id: id
      }
    })
    return `${user?.first_name} ${user?.last_name}`
  }
  // Lấy danh sách
  async fetchAllStory(user_id: string) {
    // Lấy danh sách bạn bè của người dùng
    const resFriendOfUser = await userService.fetchFriendOfUser(user_id, 1, 1000)
    const friends = resFriendOfUser.data.friends as any
    const friendIds = friends.map((friend: any) => friend.user_id)
    // Thêm user_id của người tạo vào danh sách friendIds
    friendIds.push(user_id)

    const fullname = await this.getFullName(user_id)
    // Lấy story của người tạo và bạn bè
    const story = await models.Story.findAll({
      where: {
        user_id: friendIds,
        is_archived: false
      },
      include: [
        {
          model: models.User,
          as: 'user',
          attributes: ['first_name', 'last_name'],
          where: {
            user_id: friendIds
          },
          include: [
            {
              model: models.Profile, // Giả sử tên model của bạn là Profile
              attributes: ['profile_picture']
            }
          ]
        }
      ]
    })

    return {
      message: 'Thanh cong',
      data: {
        story
      }
    }
  }
  async moveToArchive(story_id: string, userId: string) {
    const story = await models.Story.findByPk(story_id)
    if (!story) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Tin không tồn tại!')
    }

    // Kiểm tra xem người dùng hiện tại có phải là người tạo tin không
    if (story.user_id !== userId) {
      throw new CustomErrorHandler(StatusCodes.FORBIDDEN, 'Bạn không có quyền di chuyển tin này!')
    }

    // Thay đổi trạng thái của story để di chuyển vào mục lưu trữ
    await story.update({ is_archived: true })

    return {
      message: 'Di chuyển tin vào mục lưu trữ thành công',
      data: {
        story
      }
    }
  }

  // Khôi phục tin từ mục lưu trữ
  async unarchiveStory(story_id: string, userId: string) {
    const story = await models.Story.findByPk(story_id)
    if (!story) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Tin không tồn tại!')
    }

    // Kiểm tra xem người dùng hiện tại có phải là người tạo tin không
    if (story.user_id !== userId) {
      throw new CustomErrorHandler(StatusCodes.FORBIDDEN, 'Bạn không có quyền khôi phục tin này!')
    }

    // Cập nhật trạng thái lưu trữ
    await story.update({
      is_archived: false,
      story_time: new Date()
    })
    return {
      message: 'Khôi phục tin thành công',
      data: {
        story
      }
    }
  }
  // Lấy tin đã lưu trữ
  async fetchArchivedStories(user_id: string) {
    const resFriendOfUser = await userService.fetchFriendOfUser(user_id, 1, 1000)
    const friends = resFriendOfUser.data.friends as any
    const friendIds = friends.map((friend: any) => friend.user_id)

    friendIds.push(user_id)
    const fullname = await this.getFullName(user_id)

    // Lấy story đã lưu trữ của người tạo và bạn bè
    const story = await models.Story.findAll({
      where: {
        user_id: friendIds,
        is_archived: true
      },
      include: [
        {
          model: models.User,
          as: 'user',
          attributes: ['first_name', 'last_name'],
          where: {
            user_id: user_id
          },
          include: [
            {
              model: models.Profile,
              attributes: ['profile_picture']
            }
          ]
        }
      ]
    })

    return {
      message: 'Thanh cong',
      data: {
        story
      }
    }
  }

  // Thêm mới Tin
  async addNewStory(story: StoryInput, userId: string) {
    const newStory = await models.Story.create({ ...story, user_id: userId })
    return {
      message: 'Thêm Tin thành công',
      data: { newStory }
    }
  }
  // Đếm view
  async countViewStory(story_id: string) {
    const story = await models.Story.findByPk(story_id)
    if (!story) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Tin không tồn tại!')
    }
    // Cập nhật số lượt xem
    const oldView = +story.story_view || 0 // Nếu không có giá trị, đặt là 0
    const newView = oldView + 1

    await models.Story.update(
      { story_view: newView.toString() }, // Dữ liệu cập nhật
      { where: { story_id } } // Điều kiện cập nhật
    )
    return {
      message: 'Cập nhật đếm thành công',
      data: {
        story
      }
    }
    // return { id: story_id, new_view_count: newView }
  }
  // Cập nhật tin
  async updateStory(story_id: string, userId: string, data: StoryUpdate) {
    const story = await models.Story.findByPk(story_id)
    if (!story) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Tin không tồn tại!')
    }

    // Check if the story belongs to the user
    if (story.user_id !== userId) {
      throw new CustomErrorHandler(StatusCodes.FORBIDDEN, 'Không có quyền cập nhật tin này!')
    }

    await story.update(data)
    return {
      message: 'Cập nhật tin thành công',
      data: {
        story
      }
    }
  }
  // Xóa tin
  async deleteStory(story_id: string, userId: string) {
    const story = await models.Story.findByPk(story_id)
    if (!story) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Tin không tồn tại!')
    }

    // Kiểm tra xem người dùng hiện tại có phải là người tạo tin không
    if (story.user_id !== userId) {
      throw new CustomErrorHandler(StatusCodes.FORBIDDEN, 'Bạn không có quyền xóa tin này!')
    }

    await story.destroy()
    return {
      message: 'Xóa tin thành công',
      data: {
        story
      }
    }
  }
  // CHi tiết tin
  async storyDetail(story_id: string) {
    const storyDetail = await models.Story.findByPk(story_id)
    if (!storyDetail) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tìm thấy tin!')
    }
    return {
      message: 'Chi tiết tin.',
      data: {
        storyDetail
      }
    }
  }
}

export default new storyService()
