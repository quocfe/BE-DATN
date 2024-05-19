import { StatusCodes } from 'http-status-codes'
import models from '../db/models'
import { InterestInput } from '../types/interest.type'
import { CustomErrorHandler } from '../utils/ErrorHandling'
import { Op } from 'sequelize'

class interestService {
  // Danh sách sở thích
  async fetchAllInterests() {
    const interests = await models.Interest.findAll({
      order: [['createdAt', 'DESC']]
    })

    return {
      message: 'Danh sách sở thích',
      data: {
        interests
      }
    }
  }

  // Thêm sở thích
  async addNewInterest(interest: InterestInput) {
    const { interest_name } = interest

    const [newInterest, created] = await models.Interest.findOrCreate({
      where: { interest_name },
      defaults: { interest_name }
    })

    if (!created) {
      throw new CustomErrorHandler(StatusCodes.CONFLICT, 'Sở thích này đã tồn tại!')
    }

    return {
      message: 'Thêm sở thích thành công',
      data: {
        interest: newInterest
      }
    }
  }

  // Cập nhật sở thích
  async updateInterest(interest_id: string, dataUpdateInterest: InterestInput) {
    const { interest_name } = dataUpdateInterest

    const interest = await models.Interest.findByPk(interest_id)

    if (!interest) throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Sở thích không tồn tại!')

    await interest.update({ interest_name })

    return {
      message: 'Cập nhật sở thích thành công!',
      data: {
        interest
      }
    }
  }

  // Xóa sở thích
  async deleteInterest(interest_id: string) {
    const interest = await models.Interest.findByPk(interest_id)

    if (!interest) throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Sở thích không tồn tại!')

    await interest.destroy()

    return {
      message: 'Xóa sở thích thành công',
      data: {
        interest
      }
    }
  }

  // Tìm kiếm sở thích
  async searchInterest(search: InterestInput) {
    const { interest_name } = search

    const filterSearchInterest = await models.Interest.findAll({
      where: {
        interest_name: {
          [Op.like]: `${interest_name.charAt(0).toUpperCase()}%`
        }
      }
    })

    return {
      message: 'Danh sách tìm kiếm sở thích',
      data: {
        interests: filterSearchInterest
      }
    }
  }
}

export default new interestService()
