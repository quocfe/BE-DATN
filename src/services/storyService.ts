import { StatusCodes } from 'http-status-codes'
import models from '../db/models'
import { StoryInput, StoryUpdate } from '../types/story.type'
import { CustomErrorHandler } from '../utils/ErrorHandling'
import userService from './userService';
import { User } from '../types/user.type';
class storyService {
  // Lấy danh sách
  async fetchAllStory(user_id: string) {
    // Lấy danh sách bạn bè của người dùng
    const resFriendOfUser = await userService.fetchFriendOfUser(user_id);
    const friends = resFriendOfUser.data.friends as any;
    const friendIds = friends.map((friend: any) => friend.user_id);

    // Thêm user_id của người tạo vào danh sách friendIds
    friendIds.push(user_id);

    // Lấy story của người tạo và bạn bè
    const story = await models.Story.findAll({
        where: {
            user_id: friendIds
        }
    });

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
    const story = await models.Story.findByPk(story_id);
    if (!story) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Tin không tồn tại!');
    }

    // Kiểm tra xem người dùng hiện tại có phải là người tạo tin không
    if (story.user_id !== userId) {
      throw new CustomErrorHandler(StatusCodes.FORBIDDEN, 'Bạn không có quyền xóa tin này!');
    }

    await story.destroy();
    return {
      message: 'Xóa tin thành công',
      data: {
        story
      }
    };
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
