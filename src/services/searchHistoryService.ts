import { StatusCodes } from 'http-status-codes'
import models from '../db/models'
import { CustomErrorHandler } from '../utils/ErrorHandling'
import { CreateSearchHistory } from '../types/searchHistory.type'

class searchHistoryService {
  // Lịch sử người dùng tìm kiếm
  async fetchAllSearchHistory(user_id: string) {
    const friendships = await models.Friendship.findAll()
    const histories = await models.SearchHistory.findAll({
      where: {
        user_id
      },
      order: [['updatedAt', 'DESC']]
    })

    const targetUserIds = histories.filter((search) => search.search_type === 'user').map((search) => search.target_id)

    // Tạo Mapping (ánh xạ) duy trì thứ thự
    const orderMapping: { [key: string]: number } = {}

    targetUserIds.forEach((targer_id, index) => {
      orderMapping[targer_id] = index
    })

    const searchedUsers = await models.User.findAll({
      attributes: ['user_id', 'first_name', 'last_name'],
      where: {
        user_id: targetUserIds
      },
      include: [
        {
          model: models.Profile,
          attributes: ['profile_picture']
        }
      ]
    })

    const userSearchWithStatus = searchedUsers.map((user) => {
      // kiểm tra mối quan hệ giữa người dùng được tìm kiếm và người dùng đang tìm kiếm
      const record = friendships.find(
        (f) =>
          (f.user_id === user.user_id && f.friend_id === user_id) ||
          (f.friend_id === user.user_id && f.user_id === user_id)
      )

      let status = ''

      if (record) {
        status =
          record.status === 'Chờ chấp nhận'
            ? record.user_id === user_id
              ? 'Đang chờ phản hồi'
              : 'Chờ chấp nhận'
            : 'Bạn bè'
      } else {
        status = user.user_id === user_id ? 'Tôi' : 'Chưa kết bạn'
      }

      return {
        ...user.toJSON(),
        status: status
      }
    })

    const orderedUsers = userSearchWithStatus.sort((a, b) => orderMapping[a.user_id] - orderMapping[b.user_id])

    return {
      message: 'Danh sách lịch sử tìm kiếm',
      data: {
        list: orderedUsers
      }
    }
  }

  // Thêm mới lịch sử tìm kiếm
  async addNewSearchHistory(user_id: string, searchHistoryData: CreateSearchHistory) {
    const { target_id, search_type } = searchHistoryData

    if (search_type === 'user') {
      const targetUser = await models.User.findByPk(target_id)

      if (!targetUser) {
        throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại người dùng')
      }
    } else if (search_type === 'fanpage') {
      // code here
    } else {
      throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, 'Kiểu Type không hợp lệ')
    }

    const isSearchHistoryExists = await models.SearchHistory.findOne({
      where: {
        user_id,
        target_id
      }
    })

    if (isSearchHistoryExists) {
      await isSearchHistoryExists.destroy()
    }

    const searchHistoryCount = await models.SearchHistory.count({
      where: { user_id, search_type }
    })

    if (searchHistoryCount >= 6) {
      const oldSearchHistory = await models.SearchHistory.findOne({
        where: { user_id, search_type },
        order: [['createdAt', 'ASC']]
      })

      if (oldSearchHistory) {
        oldSearchHistory.destroy()
      }
    }

    const newSearchHistory = await models.SearchHistory.create({
      user_id,
      target_id,
      search_type
    })

    return {
      message: 'Thêm mới lịch sử tìm kiếm',
      data: {
        search: newSearchHistory
      }
    }
  }

  // Xóa lịch xử tìm kiếm
  async deleteSearchHistory(user_id: string, target_id: string) {
    const isSearchHistoryExists = await models.SearchHistory.findOne({
      where: { user_id, target_id }
    })

    if (!isSearchHistoryExists) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại tìm kiếm này!')
    }

    await isSearchHistoryExists.destroy()

    return {
      message: 'Xóa lịch sử tìm kiếm thành công',
      data: {}
    }
  }

  // Xóa tất cả lịch sử tìm kiếm
  async clearSearchHistory(user_id: string) {
    const isUserExists = await models.User.findByPk(user_id)

    if (!isUserExists) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Người dùng không tồn tại!')
    }

    await models.SearchHistory.destroy({
      where: { user_id }
    })

    return {
      message: 'Xóa tất cả lịch sử tìm kiếm thành công!',
      data: {}
    }
  }
}

export default new searchHistoryService()
