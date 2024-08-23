import { Request, Response } from 'express'
import { sendResponseSuccess } from '../utils/response'
import { UserOutput } from '../types/user.type'
import models from '../db/models'
import db from '../connection'

const getFavoriteVideo = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserOutput

    const favorites = await models.FavoriteVideos.findAll({
      where: {
        user_id: user.user_id
      },
      attributes: {
        exclude: ['user_id', 'video_id', 'updatedAt'] // Exclude the updatedAt attribute
      },
      include: [
        {
          model: models.Video,
          as: 'video',
          attributes: {
            exclude: ['category_video_id', 'updatedAt'] // Exclude the updatedAt attribute
          },
          include: [
            {
              model: models.User,
              as: 'user',
              attributes: ['user_id', 'first_name', 'last_name'], // Specify which user attributes to include
              include: [
                {
                  model: models.Profile,
                  // attributes: ['cover_photo']
                }
              ]
            }
          ]
        }
      ]
    })

    return sendResponseSuccess(res, {
      message: 'Lấy danh sách thành công.',
      data: favorites
    })
  } catch (error: any) {
    return res.status(500).json({
      message: 'Có lỗi xảy ra',
      error: error.message
    })
  }
}

const createFavoriteVideo = async (req: Request, res: Response) => {
  const { video_id } = req.params
  const user = req.user as UserOutput

  const transaction = await db.transaction()

  try {
    const favorite = await models.FavoriteVideos.findOne({
      where: {
        user_id: user.user_id,
        video_id: video_id
      },
      transaction: transaction
    })

    if (favorite) {
      await favorite.destroy({ transaction: transaction })

      await transaction.commit()

      return sendResponseSuccess(res, {
        message: 'Xóa khỏi danh sách yêu thích thành công.',
        data: {}
      })
    } else {
      await models.FavoriteVideos.create(
        {
          user_id: user.user_id,
          video_id: video_id
        },
        { transaction: transaction }
      )
      await transaction.commit()
      return sendResponseSuccess(res, {
        message: 'Thêm vào danh sách yêu thích thành công.',
        data: {}
      })
    }
  } catch (error: any) {
    await transaction.rollback()
    return res.status(500).json({
      message: 'Có lỗi xảy ra',
      error: error.message
    })
  }
}

const getFavoriteVideoItem = async (req: Request, res: Response) => {
  const { video_id } = req.params
  const user = req.user as UserOutput

  try {
    const favorite = await models.FavoriteVideos.findOne({
      where: {
        user_id: user.user_id,
        video_id: video_id
      }
    })

    return sendResponseSuccess(res, {
      message: 'Get favorite success',
      data: {
        isFavorite: Boolean(favorite)
      }
    })
  } catch (error: any) {
    return res.status(500).json({
      message: 'Có lỗi xảy ra',
      error: error.message
    })
  }
}

export { createFavoriteVideo, getFavoriteVideoItem, getFavoriteVideo }
