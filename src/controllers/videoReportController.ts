import { Request, Response } from 'express'
import models from '../db/models'
import { UserOutput } from '../types/user.type'
import { sendResponseSuccess } from '../utils/response'

// CREATE VIDEO REPORT AND DELETE REPORT
const updateReportVideo = async (req: Request, res: Response) => {
  try {
    const { video_id } = req.params
    const user = req.user as UserOutput

    const videoReport = await models.VideoReport.findOne({
      where: {
        video_id,
        user_id: user.user_id
      }
    })

    if (videoReport) {
      // TODO
      return res.status(500).json({
        message: 'Bỏ report video'
      })
    }

    const report = await models.VideoReport.create({
      video_id,
      user_id: user.user_id
    })

    return sendResponseSuccess(res, {
      message: 'Report video successfull.',
      data: report
    })
  } catch (error: any) {
    res.status(500).json({
      message: 'Có lỗi xảy ra trong quá trình tải lên hình ảnh',
      error: error.message
    })
  }
}

export { updateReportVideo }
