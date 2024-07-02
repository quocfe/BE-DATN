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
    const user = req.user as UserOutput

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

    if (!video) {
      return res.status(404).json({
        message: 'Video không tồn tại.'
      })
    }

    const likes = await models.LikeVideo.findAll({
      where: {
        comment_id: '',
        video_id: video.id // Sửa lỗi cú pháp
      },
      attributes: [
        [db.fn('COUNT', db.col('*')), 'like_count'],
        [db.fn('MAX', db.literal(`CASE WHEN user_id = '${user?.user_id}' THEN 1 ELSE 0 END`)), 'isLike']
      ],
      raw: true
    })

    const videoData = video.toJSON() // Chuyển đổi video thành đối tượng JSON
    const likesData = likes.length > 0 ? likes[0] : { like_count: 0, isLike: 0 } // Xử lý trường hợp không có likes

    return sendResponseSuccess(res, {
      message: 'Tải bài viết thành công.',
      data: { ...videoData, ...likesData }
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
console.log('get resource');
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

// const updateVideo = async (req: Request, res: Response) => {
//   try {
//     const { video_id } = req.params
//     const { content } = req.body

//     const updateData = await models.Video.update({
//       content
//     })
//   } catch (error) {}
// }

const updateVideoView = async (req: Request, res: Response) => {
  try {
    const { video_id } = req.params
    const { content } = req.body

    const video = await models.Video.findOne({
      where: {
        id: video_id
      }
    })

    if (!video) {
      return res.status(404).json({ message: 'Video not found' })
    }

    video.update({
      view: video.view + 1
    })

    return res.json({ message: 'Video view count updated successfully', video })
  } catch (error) {}
}

export { getVideos, createVideo, destroyVideo, getVideo, findOneVideo, updateVideoView }
