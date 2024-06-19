import { Request, Response } from 'express'
import models from '../db/models'
import { sendResponseSuccess } from '../utils/response'
import { UserOutput } from '../types/user.type'
import LIKE_TYPE from '../constants/likeVideo'
import { Sequelize } from 'sequelize'
import db from '../connection'

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

    const query = `
      SELECT 
        COUNT(*) as likeCount, 
        MAX(CASE WHEN user_id = :userId THEN 1 ELSE 0 END) as isLike 
      FROM LikeVideos 
      WHERE video_id = :videoId
    `

    const result = await models.LikeVideo.findAndCountAll({
      where: { video_id },
      attributes: [
        [db.fn('COUNT', db.col('*')), 'likeCount'],
        [db.fn('MAX', db.literal(`CASE WHEN user_id = '${user?.user_id}' THEN 1 ELSE 0 END`)), 'isLike']
      ]
    })

    return sendResponseSuccess(res, {
      message: 'Thành công',
      data: {
        count: result.count,
        ...result.rows[0].dataValues
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
    const { video_id } = req.params
    const user = req.user as UserOutput

    const likeVideo = await models.LikeVideo.findOne({
      where: { video_id: video_id, user_id: user?.user_id }
    })
    if (!likeVideo) {
      await models.LikeVideo.create({
        comment_id: '',
        like_type: LIKE_TYPE[1],
        user_id: user?.user_id,
        video_id: video_id
      })

      return sendResponseSuccess(res, {
        message: 'Like video thành công',
        data: {}
      })
    }
    await models.LikeVideo.destroy({
      where: {
        id: likeVideo.id
      }
    })

    return sendResponseSuccess(res, {
      message: 'Bỏ like thành công',
      data: {}
    })
  } catch (error: any) {
    return res.status(500).json({
      message: 'Dã có lỗi xảy ra',
      error: error.message
    })
  }
}

export { likeVideo, getlikeVideoItem, getlikeCountVideoItem }
