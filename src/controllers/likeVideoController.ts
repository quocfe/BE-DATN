import { Request, Response } from 'express'
import models from '../db/models'
import { sendResponseSuccess } from '../utils/response'
import { UserOutput } from '../types/user.type'
import LIKE_TYPE from '../constants/likeVideo'
import { Sequelize } from 'sequelize'
import db from '../connection'
import { patchLikeCommentVideo, patchLikeVideo } from '../services/like-video-service'

// [GET] api/like-video/:video_id
const getlikeVideoItem = async (req: Request, res: Response) => {
  try {
    const { video_id } = req.params
    const user = req.user as UserOutput

    const likeVideo = await models.LikeVideo.findAll({
      where: { video_id: video_id }
    })

    const isLike = likeVideo ? likeVideo.some((item) => item.user_id === user.user_id) : false

    return sendResponseSuccess(res, {
      message: 'Like video thành công',
      data:
        {
          list_like: likeVideo,
          isLike
        } ?? []
    })
  } catch (error: any) {
    return res.status(500).json({
      message: 'Dã có lỗi xảy ra',
      error: error.message
    })
  }
}

// [GET] api/like-video/count/:video_id
const getlikeCountVideoItem = async (req: Request, res: Response) => {
  try {
    const { video_id } = req.params
    const user = req.user as UserOutput

    const result = await models.LikeVideo.findAndCountAll({
      where: { video_id, comment_id: '' },
      attributes: [
        [db.fn('COUNT', db.col('*')), 'likeCount'],
        [db.fn('MAX', db.literal(`CASE WHEN user_id = '${user?.user_id}' THEN 1 ELSE 0 END`)), 'isLike']
      ]
    })
    console.log(result)
    return sendResponseSuccess(res, {
      message: 'Thành công',
      data: {
        count: result.count,
        likeCount: result.rows.length > 0 ? result.rows[0].dataValues.likeCount : 0,
        isLike: result.rows.length > 0 ? result.rows[0].dataValues.isLike : 0
      }
    })
  } catch (error: any) {
    return res.status(500).json({
      message: 'Dã có lỗi xảy ra',
      error: error.message
    })
  }
}

// [PATCH] api/like-video/:video_id
const likeVideo = async (req: Request, res: Response) => {
  try {
    // const { video_id } = req.params
    const { comment_id } = req.body
    console.log('comment_id', req.body)
    // const user = req.user as UserOutput

    // const likeVideo = await models.LikeVideo.findOne({
    //   where: { video_id: video_id, user_id: user?.user_id }
    // })
    // if (!likeVideo) {
    //   await models.LikeVideo.create({
    //     like_type: LIKE_TYPE[1],
    //     user_id: user?.user_id,
    //     video_id: video_id,
    //     comment_id
    //   })

    //   return sendResponseSuccess(res, {
    //     message: 'Like video thành công',
    //     data: {}
    //   })
    // }

    // await likeVideo.destroy()

    // return sendResponseSuccess(res, {
    //   message: 'Bỏ like thành công',
    //   data: {}
    // })

    if (!comment_id) {
      return await patchLikeVideo(req, res)
    }

    return await patchLikeCommentVideo(req, res)
  } catch (error: any) {
    return res.status(500).json({
      message: 'Dã có lỗi xảy ra',
      error: error.message
    })
  }
}

export { likeVideo, getlikeVideoItem, getlikeCountVideoItem }
