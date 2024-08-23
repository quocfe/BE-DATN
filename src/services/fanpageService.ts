import { StatusCodes } from 'http-status-codes'
import models from '../db/models'
import { FanpageInput } from '../types/fanpage.type'
import { CustomErrorHandler } from '../utils/ErrorHandling'
import User from '../db/models/User'
import Fanpage from '../db/models/Fanpage'
import FanpageMember from '../db/models/FanpageMember'
import { ResponseSuccessData } from '../types/response.type'

class FanpageService {
  async createFanpage(fanpage: FanpageInput, userId: string): Promise<ResponseSuccessData> {
    const newFanpage = await models.Fanpage.create({ ...fanpage, user_id: userId })
    return {
      message: 'Fanpage created successfully',
      data: { newFanpage }
    }
  }

  async updateFanpage(fanpageId: string, data: FanpageInput): Promise<ResponseSuccessData> {
    const fanpage = await models.Fanpage.findByPk(fanpageId)
    if (!fanpage) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Fanpage not found!')
    }
    await fanpage.update(data)
    return {
      message: 'Fanpage updated successfully',
      data: { fanpage }
    }
  }

  async deleteFanpage(fanpageId: string): Promise<ResponseSuccessData> {
    const fanpage = await models.Fanpage.findByPk(fanpageId)
    if (!fanpage) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Fanpage not found!')
    }
    await fanpage.destroy()
    return {
      message: 'Fanpage deleted successfully',
      data: { fanpage }
    }
  }
  // async updateImage(fanpageId: string): Promise<ResponseSuccessData> {
  //   const fanpage = await models.Fanpage.findByPk(fanpageId);
  //   if (!fanpage) {
  //     throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Fanpage not found!');
  //   }
  //   // Tải lên ảnh và lấy URL
  //   const imageUrl = await uploadImage(data.image);
  //   // Cập nhật URL của ảnh vào fanpage
  //   await fanpage.update({ image: imageUrl });
  //   return {
  //     message: 'Fanpage image updated successfully',
  //     data: { fanpage },
  //   };
  // }

  async getFanpageDetail(fanpageId: string): Promise<ResponseSuccessData> {
    const fanpageDetail = await models.Fanpage.findByPk(fanpageId)
    if (!fanpageDetail) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Fanpage not found!')
    }
    return {
      message: 'Fanpage details retrieved',
      data: { fanpageDetail }
    }
  }

  async getFanpagesByUserId(userId: string): Promise<ResponseSuccessData> {
    const fanpages = await models.Fanpage.findAll({
      where: { user_id: userId }
    })

    return {
      message: 'Fanpages retrieved successfully',
      data: { fanpages }
    }
  }

  async getAllFanpages() {
    const fanpages = await models.Fanpage.findAll()
    return {
      message: 'All fanpages retrieved successfully',
      data: { fanpages }
    }
  }

  async inviteMember(fanpageId: string, memberId: string): Promise<ResponseSuccessData> {
    try {
      // Kiểm tra xem fanpageId tồn tại
      const fanpage = await Fanpage.findByPk(fanpageId)
      if (!fanpage) {
        throw new Error(`Fanpage with id ${fanpageId} not found.`)
      }

      // Kiểm tra xem memberId tồn tại và không phải là thành viên hoặc đã được mời
      const member = await User.findByPk(memberId)
      if (!member) {
        return {
          message: `User with id ${memberId} not found.`,
          data: {}
        }
      }

      const existingMembership = await FanpageMember.findOne({
        where: {
          fanpage_id: fanpageId,
          user_id: memberId
        }
      })

      if (existingMembership) {
        return {
          message: `User ${memberId} is already invited or a member of this fanpage.`,
          data: {}
        }
      }

      // Tạo mối quan hệ FanpageMember mới
      const newMembership = await FanpageMember.create({
        fanpage_id: fanpageId,
        user_id: memberId
      })

      return {
        message: `User ${memberId} invited to fanpage ${fanpageId} successfully`,
        data: { newMembership }
      }
    } catch (error) {
      console.log(error)
      throw new CustomErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, '')
    }
  }

  async getAllFanpageMembers(): Promise<ResponseSuccessData> {
    try {
      const members = await FanpageMember.findAll()
      return {
        message: 'All fanpage members retrieved successfully',
        data: { members }
      }
    } catch (error) {
      throw new CustomErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal server error.')
    }
  }

  async leaveFanpage(fanpageId: string, userId: string): Promise<ResponseSuccessData> {
    try {
      // Xóa mối quan hệ FanpageMember
      const deletedCount = await FanpageMember.destroy({
        where: {
          fanpage_id: fanpageId,
          user_id: userId
        }
      })

      if (deletedCount === 0) {
        throw new Error(`User ${userId} is not a member of this fanpage.`)
      }

      return { message: `User ${userId} has left the fanpage successfully.`, data: {} }
    } catch (error) {
      throw new CustomErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, '')
    }
  }

  async followFanpage(fanpageId: string, userId: string): Promise<ResponseSuccessData> {
    try {
      // Kiểm tra xem fanpageId tồn tại
      const fanpage = await Fanpage.findByPk(fanpageId)
      if (!fanpage) {
        throw new Error(`Fanpage with id ${fanpageId} not found.`)
      }

      // Kiểm tra xem userId tồn tại và chưa là thành viên hoặc đã follow fanpage này
      const user = await User.findByPk(userId)
      if (!user) {
        throw new Error(`User with id ${userId} not found.`)
      }

      const existingMembership = await FanpageMember.findOne({
        where: {
          fanpage_id: fanpageId,
          user_id: userId
        }
      })

      if (existingMembership) {
        existingMembership.is_following = true
        existingMembership.is_invited = true

        await existingMembership.save()
        return {
          message: `User ${userId} is now following fanpage ${fanpageId}.`,
          data: { existingMembership }
        }
      }

      // Tạo mối quan hệ FanpageMember mới
      const newMembership = await FanpageMember.create({
        fanpage_id: fanpageId,
        user_id: userId,
        is_following: true,
        is_invited: true
      })

      return {
        message: `User ${userId} is now following fanpage ${fanpageId}.`,
        data: { newMembership }
      }
    } catch (error) {
      console.log(error)
      throw new CustomErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, '')
    }
  }

  async unfollowFanpage(fanpageId: string, userId: string): Promise<ResponseSuccessData> {
    try {
      // Tìm kiếm mối quan hệ FanpageMember
      const fanpageMember = await FanpageMember.findOne({
        where: {
          fanpage_id: fanpageId,
          user_id: userId
        }
      })

      if (!fanpageMember) {
        throw new Error(`User ${userId} is not following this fanpage.`)
      }

      // Cập nhật thuộc tính is_following thành false
      fanpageMember.is_following = false
      await fanpageMember.save()

      return { message: `User ${userId} has unfollowed the fanpage successfully.`, data: {} }
    } catch (error) {
      console.log(error)
      throw new CustomErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, '')
    }
  }

  async getFanpageMembers(fanpageId: string): Promise<ResponseSuccessData> {
    try {
      // Kiểm tra xem fanpageId tồn tại
      const fanpage = await Fanpage.findByPk(fanpageId)
      if (!fanpage) {
        throw new CustomErrorHandler(StatusCodes.NOT_FOUND, `Fanpage with id ${fanpageId} not found.`)
      }

      // Lấy danh sách thành viên của fanpage
      const members = await FanpageMember.findAll({
        where: { fanpage_id: fanpageId }
      })

      return {
        message: 'Fanpage members retrieved successfully',
        data: { members }
      }
    } catch (error) {
      console.log(error)
      throw new CustomErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal server error.')
    }
  }
}

export default new FanpageService()
function uploadImage(image: any) {
  throw new Error('Function not implemented.')
}
