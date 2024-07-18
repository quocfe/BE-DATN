import { Request, Response } from 'express'
import { cloudinaryGetResource, cloudinaryUploadVideo, destroyCloudinary } from '../helpers/cloudinary'
import { UploadApiResponse } from 'cloudinary'
import { sendResponseSuccess } from '../utils/response'
import models from '../db/models'
import { CreateVideoRequest } from '../types/video.type'
import { UserOutput } from '../types/user.type'
import db from '../connection'
import { col, fn, literal, Op } from 'sequelize'
import PRIVACY from '../constants/video'

const UPDATE_STATUS = {
  __VIEW__: '__VIEW__',
  __DATA__: '__DATA__'
}

const getVideos = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserOutput

    const videos: any = await models.Video.findAll({
      where: {
        [Op.or]: [
          { '$user.user_id$': user.user_id }, // user_id === user.user_id
          // {
          //   [Op.and]: [
          //     { '$user.user_id$': { [Op.ne]: user.user_id } }, // user_id !== user.user_id
          //     { privacy: 'ALL' }
          //   ]
          // }
          {
            '$user.user_id$': { [Op.ne]: user.user_id }, // user_id !== user.user_id
            privacy: PRIVACY.ALL
          }
        ]
      },
      attributes: {
        exclude: ['updatedAt', 'category_video_id'], // Exclude the updatedAt attribute
        include: [
          // Include total_comments as a literal SQL query
          [
            literal('(SELECT COUNT(*) FROM `comment-videos` WHERE `comment-videos`.`video_id` = `videos`.`id`)'),
            'total_comments'
          ],
          [
            literal('(SELECT COUNT(*) FROM `like-videos` WHERE `like-videos`.`video_id` = `videos`.`id`)'),
            'total_likes'
          ]
        ]
      },
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
      ],
      group: ['videos.id']
    })

    const videoIds = videos.map((video: any) => video.id)
    const isLikes = await models.LikeVideo.findAll({
      where: {
        video_id: {
          [Op.in]: videoIds
        },
        user_id: user.user_id
      },
      attributes: ['video_id']
    })

    // Thêm thông tin isLikes vào từng video
    videos.forEach((video: any) => {
      const liked = isLikes.some((like) => like.video_id === video.id)
      video.dataValues.isLike = liked
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

    const video: any = await models.Video.findOne({
      where: { id },
      attributes: {
        exclude: ['updatedAt', 'category_video_id'], // Exclude the updatedAt attribute
        include: [
          // Include total_comments as a literal SQL query
          [
            literal('(SELECT COUNT(*) FROM `comment-videos` WHERE `comment-videos`.`video_id` = `videos`.`id`)'),
            'total_comments'
          ],
          [
            literal('(SELECT COUNT(*) FROM `like-videos` WHERE `like-videos`.`video_id` = `videos`.`id`)'),
            'total_likes'
          ]
        ]
      },
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
        // {
        //   model: models.LikeVideo,
        //   as: 'likes',
        //   attributes: [[fn('COUNT', fn('DISTINCT', col('likes.id'))), 'total_likes']]
        // }
      ]
    })

    const isLikes = await models.LikeVideo.findOne({
      where: {
        video_id: video?.id,
        user_id: user.user_id
      },
      attributes: ['video_id']
    })

    // Thêm thông tin isLikes vào từng video
    video.dataValues.isLike = Boolean(isLikes)

    if (!video) {
      return res.status(404).json({
        message: 'Video không tồn tại.'
      })
    }

    return sendResponseSuccess(res, {
      message: 'Tải bài viết thành công.',
      data: video
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

// const updateVideo = async (req: Request, res: Response) => {
//   try {
//     const { video_id } = req.params
//     const { content } = req.body

//     const updateData = await models.Video.update({
//       content
//     })
//   } catch (error) {}
// }

const updateVideo = async (req: Request, res: Response) => {
  try {
    const { status } = req.query
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

    if (status === UPDATE_STATUS.__VIEW__) {
      video.update({
        view: video.view + 1
      })

      return res.json({ message: 'Video view count updated successfully', video })
    }

    video.update({
      content
    })

    return res.json({ message: 'Video updated successfully', video })
  } catch (error: any) {
    res.status(500).json({
      message: 'Có lỗi xảy ra trong quá trình tải lên hình ảnh',
      error: error.message
    })
  }
}

export { getVideos, createVideo, destroyVideo, getVideo, findOneVideo, updateVideo }
