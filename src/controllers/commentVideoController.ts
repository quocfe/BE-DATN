import { Request, Response } from 'express'
import { UserOutput } from '../types/user.type'
import { sendResponseSuccess } from '../utils/response'
import models from '../db/models'
import { Op, Sequelize } from 'sequelize'
import db from '../connection'

// [PATCH] /api/v1/comment-video/:video_id
const getCommentVideoItem = async (req: Request, res: Response) => {
  try {
    const { video_id } = req.params
    const user = req.user as UserOutput

    const comments = await models.CommentVideo.findAll({
      where: {
        video_id,
        parent_id: null // Fetch only parent comments
      },
      include: [
        {
          model: models.User,
          as: 'user',
          attributes: ['user_id', 'first_name', 'last_name'],
          include: [
            {
              model: models.Profile,
              // attributes: ['cover_photo']
            }
          ]
        }
      ],

      order: [['createdAt', 'ASC']]
    })

    const newComments = await Promise.all(
      comments.map(async (comment: any) => {
        const likes = await models.LikeVideo.findAll({
          where: {
            comment_id: comment.id,
            video_id: comment.video_id
          },
          attributes: [
            [db.fn('COUNT', db.col('*')), 'like_count'],
            [db.fn('MAX', db.literal(`CASE WHEN user_id = '${user?.user_id}' THEN 1 ELSE 0 END`)), 'isLike']
          ]
        })

        const childrenComment = await models.CommentVideo.count({
          where: {
            parent_id: comment.id,
            video_id: comment.video_id
          }
        })

        comment.dataValues = { ...comment.dataValues, ...likes[0].dataValues }
        comment.dataValues.reply_count = childrenComment
        return comment // Trả về comment đã được thêm thông tin likes
      })
    )

    return res.json({
      message: 'Lấy comment thành công',
      data: newComments
    })
  } catch (error: any) {
    return res.status(500).json({
      message: 'Đã có lỗi xảy ra',
      error: error.message
    })
  }
}

const getCommentVideoPartentItem = async (req: Request, res: Response) => {
  try {
    const { comment_id } = req.params
    const user = req.user as UserOutput

    const comments = await models.CommentVideo.findAll({
      where: {
        parent_id: comment_id // Fetch only parent comments
      },
      include: [
        {
          model: models.User,
          as: 'user',
          attributes: ['user_id', 'first_name', 'last_name'],
          include: [
            {
              model: models.Profile,
              // attributes: ['cover_photo']
            }
          ]
        }
      ],
      order: [['createdAt', 'ASC']]
    })

    const newComments = await Promise.all(
      comments.map(async (comment: any) => {
        const likes = await models.LikeVideo.findAll({
          where: {
            comment_id: comment.id,
            video_id: comment.video_id
          },
          attributes: [
            [db.fn('COUNT', db.col('*')), 'like_count'],
            [db.fn('MAX', db.literal(`CASE WHEN user_id = '${user?.user_id}' THEN 1 ELSE 0 END`)), 'isLike']
          ]
        })

        comment.dataValues = { ...comment.dataValues, ...likes[0].dataValues }
        return comment // Trả về comment đã được thêm thông tin likes
      })
    )

    return res.json({
      message: 'Lấy comment thành công',
      data: newComments
    })
  } catch (error: any) {
    return res.status(500).json({
      message: 'Đã có lỗi xảy ra',
      error: error.message
    })
  }
}

// [POST] /api/v1/comment-video/:video_id
const addCommentVideo = async (req: Request, res: Response) => {
  try {
    const { video_id } = req.params
    const { content, reply_id, parent_id } = req.body
    const user = req.user as UserOutput

    const comment = await models.CommentVideo.create({
      video_id,
      content,
      mentioned_user_id: reply_id ? reply_id : '',
      parent_id: parent_id,
      user_id: user.user_id
    })

    return sendResponseSuccess(res, {
      message: 'Bỏ like thành công',
      data: comment
    })
  } catch (error: any) {
    return res.status(500).json({
      message: 'Dã có lỗi xảy ra',
      error: error.message
    })
  }
}

// [PATCH] /api/v1/comment-video/:video_id
const editCommentVideo = async (req: Request, res: Response) => {
  try {
    const { video_id } = req.params
    const { content, reply_id, parent_id, comment_id } = req.body
    const comment = await models.CommentVideo.update(
      {
        content
      },
      {
        where: {
          id: comment_id,
          video_id
        }
      }
    )

    return sendResponseSuccess(res, {
      message: 'Chỉnh sửa commnet thành công',
      data: comment
    })
  } catch (error: any) {
    return res.status(500).json({
      message: 'Dã có lỗi xảy ra',
      error: error.message
    })
  }
}

// [DELETE] /api/v1/comment-video/:comment_id
const deleteCommentItem = async (req: Request, res: Response) => {
  try {
    const { comment_id } = req.params
    if (!comment_id) {
      throw new Error('comment_id is required')
    }
    const comnent = models.CommentVideo.destroy({
      where: {
        [Op.or]: [{ id: comment_id }, { parent_id: comment_id }]
      }
    })
    return sendResponseSuccess(res, {
      message: 'Xóa comment thành công',
      data: {}
    })
  } catch (error: any) {
    return res.status(500).json({
      message: 'Dã có lỗi xảy ra',
      error: error.message
    })
  }
}

export { getCommentVideoItem, addCommentVideo, getCommentVideoPartentItem, editCommentVideo, deleteCommentItem }
