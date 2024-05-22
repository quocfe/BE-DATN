import { body } from 'express-validator'
import { Request, Response } from 'express'
import { cloudinaryUploadVideo, destroyCloudinary } from '../helpers/cloudinary'
import { UploadApiResponse } from 'cloudinary'
import { sendResponseSuccess } from '../utils/response'
import models from '../db/models'
import { CreateVideoRequest } from '../types/video.type'
import { UserOutput } from '../types/user.type'

const createVideo = async (req: Request<unknown, unknown, CreateVideoRequest>, res: Response) => {
  try {
    const body = req.body
    const user = req.user as UserOutput

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const uploadFile: UploadApiResponse = await cloudinaryUploadVideo(req.file)

    const video = await models.Video.create({
      ...body,
      url: uploadFile.url,
      public_id: uploadFile.public_id,
      user_id: user?.user_id || ''
    })

    return sendResponseSuccess(res, {
      message: 'Tải bài viết thành công.',
      data: { ...video, uploadFile }
    })
  } catch (error: any) {
    return res.status(500).json({
      message: 'Có lỗi xảy ra trong quá trình tải lên hình ảnh',
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

export { createVideo, destroyVideo }
