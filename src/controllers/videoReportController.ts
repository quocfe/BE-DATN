import { Request, Response } from 'express'
import models from '../db/models'
import { UserOutput } from '../types/user.type'
import { sendResponseSuccess } from '../utils/response'

// Check Report

const getCheckReportVideo = async (req: Request, res: Response) => {
  const { video_id } = req.params
  const user = req.user as UserOutput

  try {
    const report = await models.VideoReport.findOne({
      where: {
        user_id: user.user_id,
        video_id: video_id
      }
    })

    return sendResponseSuccess(res, {
      message: 'Get Report success',
      data: {
        isReport: Boolean(report)
      }
    })
  } catch (error: any) {
    return res.status(500).json({
      message: 'Có lỗi xảy ra',
      error: error.message
    })
  }
}

// CREATE VIDEO REPORT AND DELETE REPORT
const updateReportVideo = async (req: Request, res: Response) => {
  try {
    const { video_id } = req.params
    const user = req.user as UserOutput
    const { reason } = req.body

    const videoReport = await models.VideoReport.findOne({
      where: {
        video_id,
        user_id: user.user_id
      }
    })

    if (videoReport) {
      // TODO

      await videoReport.destroy()

      return res.status(200).json({
        data: null,
        message: 'Bỏ tố cáo thành công.'
      })
    }

    const report = await models.VideoReport.create({
      video_id,
      user_id: user.user_id,
      reason: JSON.stringify(reason)
    })

    return sendResponseSuccess(res, {
      message: 'Tố cáo thành công.',
      data: report
    })
  } catch (error: any) {
    res.status(500).json({
      message: 'Có lỗi xảy ra trong quá trình tải lên hình ảnh',
      error: error.message
    })
  }
}

export { updateReportVideo, getCheckReportVideo }
