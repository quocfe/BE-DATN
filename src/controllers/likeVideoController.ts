import { Request, Response } from 'express'
import models from '../db/models'
import { sendResponseSuccess } from '../utils/response'
import { UserOutput } from '../types/user.type'
import LIKE_TYPE from '../constants/likeVideo'

// [GET] api/like-video/:video_id
const getlikeVideoItem = async (req: Request, res: Response) => {
  try {
    const { video_id } = req.params
    const user = req.user as UserOutput

    const likeVideo = await models.LikeVideo.findAll({
      where: { video_id: video_id }
    })

    const isLike = likeVideo ? likeVideo.some((item) => item.user_id === user.user_id) : false

    console.log(likeVideo)
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

// [PATCH] api/like-video/:video_id
const likeVideo = async (req: Request, res: Response) => {
  try {
    const { video_id } = req.params
    const user = req.user as UserOutput

    const likeVideo = await models.LikeVideo.findOne({
      where: { video_id: video_id, user_id: user?.user_id }
    })
    console.log(likeVideo)
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

export { likeVideo, getlikeVideoItem }
