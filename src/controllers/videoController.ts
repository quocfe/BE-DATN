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
import { duration } from 'moment'

const UPDATE_STATUS = {
  __VIEW__: '__VIEW__',
  __UPDATE__: '__UPDATE__'
}

// const getVideos = async (req: Request, res: Response) => {
//   try {
//     const user = req.user as UserOutput

//     const videos: any = await models.Video.findAll({
//       where: {
//         [Op.or]: [
//           // { '$user.user_id$': user?.user_id }, // user_id === user.user_id
//           // {
//           //   '$user.user_id$': { [Op.ne]: user?.user_id }, // user_id !== user.user_id
//           //   privacy: PRIVACY.ALL
//           // }
//           { user_id: user?.user_id },
//           {
//             user_id: { [Op.ne]: user?.user_id },
//             privacy: PRIVACY.ALL
//           }
//         ]
//       },
//       attributes: {
//         exclude: ['updatedAt', 'category_video_id'], // Exclude the updatedAt attribute
//         include: [
//           // Include total_comments as a literal SQL query
//           [
//             literal('(SELECT COUNT(*) FROM `comment-videos` WHERE `comment-videos`.`video_id` = `videos`.`id`)'),
//             'total_comments'
//           ],
//           [
//             literal('(SELECT COUNT(*) FROM `like-videos` WHERE `like-videos`.`video_id` = `videos`.`id`)'),
//             'total_likes'
//           ]
//         ]
//       },
//       include: [
//         {
//           model: models.User,
//           as: 'user',
//           attributes: ['user_id', 'first_name', 'last_name'], // Specify which user attributes to include
//           include: [
//             {
//               model: models.Profile,
//               attributes: ['cover_photo']
//             }
//           ]
//         }
//       ],
//       group: ['videos.id']
//     })

//     const videoIds = videos.map((video: any) => video.id)
//     const isLikes = await models.LikeVideo.findAll({
//       where: {
//         video_id: {
//           [Op.in]: videoIds
//         },
//         user_id: user.user_id
//       },
//       attributes: ['video_id']
//     })

//     // Thêm thông tin isLikes vào từng video
//     videos.forEach((video: any) => {
//       const liked = isLikes.some((like) => like.video_id === video.id)
//       video.dataValues.isLike = liked
//     })

//     return sendResponseSuccess(res, {
//       message: 'Lấy danh sách thành công.',
//       data: videos
//     })
//   } catch (error: any) {
//     return res.status(500).json({
//       message: 'Dã có lỗi xảy ra',
//       error: error.message
//     })
//   }
// }

const getVideos = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserOutput
    const { page = 1, limit = 3, contentText = '' } = req.query

    console.log('contentText: ', contentText)

    const contentTextFilter =
      contentText && String(contentText).trim() !== ''
        ? {
            contentText: {
              [Op.like]: `%${contentText}%` // Sử dụng Op.like cho tìm kiếm không phân biệt chữ hoa chữ thường
            }
          }
        : {}

    // Đếm tổng số video thỏa mãn điều kiện
    const totalRecords = await models.Video.count({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { user_id: user?.user_id },
              {
                user_id: { [Op.ne]: user?.user_id },
                privacy: PRIVACY.ALL
              }
            ]
          },
          contentTextFilter // Thêm điều kiện lọc contentText
        ]
      }
    })

    const videos = await models.Video.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { user_id: user?.user_id },
              {
                user_id: { [Op.ne]: user?.user_id },
                privacy: PRIVACY.ALL
              }
            ]
          },
          contentTextFilter // Thêm điều kiện lọc contentText
        ]
      },
      attributes: {
        exclude: ['updatedAt', 'category_video_id'],
        include: [
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
          attributes: ['user_id', 'first_name', 'last_name'],
          include: [
            {
              model: models.Profile
              // attributes: ['cover_photo']
            }
          ]
        }
      ],
      group: [
        'videos.id',
        'user.user_id',
        'user.first_name',
        'user.last_name',
        'user->Profile.profile_id',
        'user->Profile.cover_photo',
      ],

      order: [['createdAt', 'DESC']], // Sắp xếp theo createdAt theo thứ tự giảm dần
      limit: Number(limit), // Số lượng video mỗi trang
      offset: (Number(page) - 1) * Number(limit) // Vị trí bắt đầu cho mỗi trang
    })

    const videoIds = videos.map((video) => video.id)
    const isLikes = await models.LikeVideo.findAll({
      where: {
        video_id: {
          [Op.in]: videoIds
        },
        user_id: user.user_id
      },
      attributes: ['video_id']
    })

    videos.forEach((video) => {
      const liked = isLikes.some((like) => like.video_id === video.id)
      video.dataValues.isLike = liked
    })

    return sendResponseSuccess(res, {
      message: 'Lấy danh sách thành công.',
      data: {
        page: Number(page),
        limit: Number(limit),
        total: videos.length,
        content: videos,
        totalRecords: totalRecords
      }
    })
  } catch (error: any) {
    return res.status(500).json({
      message: 'Đã có lỗi xảy ra',
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

  let uploadFile: UploadApiResponse | null = null //UploadApiResponse
  try {
    uploadFile = await cloudinaryUploadVideo(req.file)
    console.log('uploadFile: ', uploadFile)
    // Tạo video mới
    const video = await models.Video.create(
      {
        ...body,
        content: typeof body.content === 'string' ? body.content : JSON.stringify(body.content),
        url: uploadFile.url,
        public_id: uploadFile.public_id,
        user_id: user.user_id,
        duration: uploadFile.duration
      },
      { transaction }
    )

    if (body.hashTags) {
      for (const tag of JSON.parse(body.hashTags)) {
        const existingHashTag = await models.HashTagsVideo.findOne({
          where: { tag },
          transaction
        })

        if (!existingHashTag) {
          await models.HashTagsVideo.create({ tag }, { transaction })
        }
      }
    }

    await transaction.commit()

    return sendResponseSuccess(res, {
      message: 'Tải bài viết thành công.',
      data: { ...video, uploadFile }
    })
  } catch (error: any) {
    // Xóa video từ Cloudinary nếu có lỗi xảy ra
    if (uploadFile && uploadFile.public_id) {
      await destroyCloudinary(uploadFile.public_id, 'video')
    }

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
              // attributes: ['cover_photo']
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

// TODO
const destroyVideo = async (req: Request, res: Response) => {
  const transaction = await db.transaction()

  try {
    const { video_id } = req.params
    const user = req.user as UserOutput

    const video = await models.Video.findOne({
      where: {
        id: video_id,
        user_id: user.user_id
      },
      transaction // Thêm transaction vào đây
    })

    if (!video) {
      await transaction.rollback() // Rollback giao dịch nếu video không tồn tại
      return res.status(500).json({
        message: 'Bạn không thể xóa video này',
        error: null
      })
    }

    await models.LikeVideo.destroy({
      where: {
        video_id: video_id
      },
      transaction // Thêm transaction vào đây
    })

    await models.CommentVideo.destroy({
      where: {
        video_id: video_id
      },
      transaction // Thêm transaction vào đây
    })

    await destroyCloudinary(video.public_id, 'video')

    await video.destroy({ transaction }) // Thêm transaction vào đây

    await transaction.commit() // Commit giao dịch nếu tất cả thao tác thành công

    return sendResponseSuccess(res, {
      message: 'Xóa video thành công.',
      data: {}
    })
  } catch (error: any) {
    await transaction.rollback() // Rollback giao dịch nếu có lỗi xảy ra
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
//     const user = req.user as UserOutput

//     const result = await models.Video.update(
//       {
//         ...req.body
//       },
//       {
//         where: { id: video_id, user_id: user.user_id }
//       }
//     )

//     if (!result) {
//       res.status(500).json({
//         message: 'Dã có lỗi xảy ra'
//       })
//     }

//     return sendResponseSuccess(res, {
//       message: 'Tải bài viết thành công.',
//       data: result
//     })
//   } catch (error: any) {
//     res.status(500).json({
//       message: 'Có lỗi xảy ra trong quá trình tải lên hình ảnh',
//       error: error.message
//     })
//   }
// }

const updateVideo = async (req: Request, res: Response) => {
  try {
    const { status } = req.query
    const { video_id } = req.params

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

      return sendResponseSuccess(res, {
        message: 'Video view count updated successfully',
        data: video
      })
    }
    console.log('req.body.content: ', req.body.content)
    if (status === UPDATE_STATUS.__UPDATE__) {
      await video.update({
        ...req.body,
        content: typeof req.body.content === 'string' ? req.body.content : JSON.stringify(req.body.content)
      })

      if (req.body.hashTags) {
        for (const tag of JSON.parse(req.body.hashTags)) {
          const existingHashTag = await models.HashTagsVideo.findOne({
            where: { tag }
            // transaction
          })

          if (!existingHashTag) {
            await models.HashTagsVideo.create({ tag })
          }
        }
      }

      return sendResponseSuccess(res, {
        message: 'Cập nhật video thành công.',
        data: video
      })
    }
  } catch (error: any) {
    res.status(500).json({
      message: 'Có lỗi xảy ra trong quá trình tải lên hình ảnh',
      error: error.message
    })
  }
}

export { getVideos, createVideo, destroyVideo, getVideo, findOneVideo, updateVideo }
