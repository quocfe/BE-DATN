import { Request, Response } from 'express'
import { cloudinaryGetResource, cloudinaryUploadVideo, destroyCloudinary } from '../helpers/cloudinary'
import { UploadApiResponse } from 'cloudinary'
import { sendResponseSuccess } from '../utils/response'
import models from '../db/models'
import { CreateVideoRequest } from '../types/video.type'
import { UserOutput } from '../types/user.type'
import db from '../connection'

const getVideos = async (req: Request, res: Response) => {
  try {
    const videos = await models.Video.findAll({
      include: [
        {
          model: models.User,
          as: 'user',
          attributes: ['user_id', 'first_name', 'last_name'] // Specify which user attributes to include
        }
      ]
    })
    return sendResponseSuccess(res, {
      message: 'Lấy danh sách thành công.',
      data: videos
    })
  } catch (error: any) {
    return res.status(500).json({
      message: 'Dã có lỗi xảy ra',
      error: error.message
    })
  }
}

const createVideo = async (req: Request<unknown, unknown, CreateVideoRequest>, res: Response) => {
  const transaction = await db.transaction()

  const body = req.body
  const user = req.user as UserOutput

  if (!req.file) {
    await transaction.rollback()
    return res.status(400).json({ message: 'Video không tồn tại' })
  }

  const uploadFile: UploadApiResponse = await cloudinaryUploadVideo(req.file)

  try {
    const video = await models.Video.create(
      {
        ...body,
        url: uploadFile.url,
        public_id: uploadFile.public_id,
        user_id: user.user_id
      },
      { transaction: transaction }
    )

    await transaction.commit()

    return sendResponseSuccess(res, {
      message: 'Tải bài viết thành công.',
      data: { ...video, uploadFile }
    })
  } catch (error: any) {
    await destroyCloudinary(uploadFile.public_id, 'video')
    await transaction.rollback()
    return res.status(500).json({
      message: 'Có lỗi xảy ra',
      error: error.message
    })
  }
}

// [GET]: api/videos/:id
const findOneVideo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const video = await models.Video.findOne({
      where: { id: id },
      include: [
        {
          model: models.User,
          as: 'user',
          attributes: ['user_id', 'first_name', 'last_name'], // Specify which user attributes to include
          include: [
            {
              model: models.Profile,
              attributes: ['cover_photo']
            }
          ]
        }
      ]
    })

    return sendResponseSuccess(res, {
      message: 'Tải bài viết thành công.',
      data: video ?? {}
    })
  } catch (error: any) {
    res.status(500).json({
      message: 'Có lỗi xảy ra ',
      error: error.message
    })
  }
}

const destroyVideo = async (req: Request, res: Response) => {
  try {
    const { public_id } = req.params
    const result = await destroyCloudinary(public_id, 'video')

    return res.json({
      result
    })
  } catch (error: any) {
    res.status(500).json({
      message: 'Có lỗi xảy ra trong quá trình tải lên hình ảnh',
      error: error.message
    })
  }
}

const getVideo = async (req: Request, res: Response) => {
  try {
    const { public_id } = req.params

    const result = await cloudinaryGetResource(public_id)
    return sendResponseSuccess(res, {
      message: 'Tải bài viết thành công.',
      data: result
    })
  } catch (error: any) {
    res.status(500).json({
      message: 'Có lỗi xảy ra trong quá trình tải lên hình ảnh',
      error: error.message
    })
  }
}

export { getVideos, createVideo, destroyVideo, getVideo, findOneVideo }
