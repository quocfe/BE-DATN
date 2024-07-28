import { Request, Response } from 'express'
import LIKE_TYPE from '../constants/likeVideo'
import models from '../db/models'
import { sendResponseSuccess } from '../utils/response'
import { UserOutput } from '../types/user.type'

const patchLikeVideo = async (req: Request, res: Response) => {
  const { video_id } = req.params
  const user = req.user as UserOutput

  const likeVideo = await models.LikeVideo.findOne({
    where: { video_id: video_id, user_id: user?.user_id, comment_id: '' }
  })
  if (!likeVideo) {
    await models.LikeVideo.create({
      like_type: LIKE_TYPE[1],
      user_id: user?.user_id,
      video_id: video_id,
      comment_id: ''
    })

    return sendResponseSuccess(res, {
      message: 'Like video thành công',
      data: {}
    })
  }

  await likeVideo.destroy()

  return sendResponseSuccess(res, {
    message: 'Bỏ like thành công',
    data: {}
  })
}

const patchLikeCommentVideo = async (req: Request, res: Response) => {
  const { video_id } = req.params
  const { comment_id } = req.body
  const user = req.user as UserOutput
console.log('like comment video', comment_id);
  if (!comment_id) {
    return res.status(500).json({
      message: 'comment_id không tồn tại',
      error: {}
    })
  }

  const likeCommentVideo = await models.LikeVideo.findOne({
    where: { video_id: video_id, user_id: user?.user_id, comment_id }
  })

  if (!likeCommentVideo) {
    await models.LikeVideo.create({
      like_type: LIKE_TYPE[1],
      user_id: user?.user_id,
      video_id: video_id,
      comment_id
    })

    return sendResponseSuccess(res, {
      message: 'Like comment video thành công',
      data: {}
    })
  }

  await likeCommentVideo.destroy()

  return sendResponseSuccess(res, {
    message: 'Bỏ like comment video thành công',
    data: {}
  })
}

export { patchLikeVideo, patchLikeCommentVideo }
