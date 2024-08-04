import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import {
  createVideo,
  destroyVideo,
  findOneVideo,
  getVideo,
  getVideos,
  updateVideo
} from '../../controllers/videoController'
import middleware from '../../middleware'

const videoRouter = Router()

// Cấu hình thư mục lưu trữ tạm thời
const uploadsDir = path.join(__dirname, '../../uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir)
}

// Cấu hình lưu trữ tạm thời bằng multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir) // Sử dụng đường dẫn tuyệt đối tới thư mục 'uploads'
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname) // Đặt tên file với timestamp để tránh trùng lặp
  }
})

const upload = multer({ storage })

// getAll
videoRouter.get('', middleware.verifyToken, getVideos)

// GET ONE
videoRouter.get('/:id', middleware.verifyToken, findOneVideo)

// create
videoRouter.post('/create', middleware.verifyToken, upload.single('video'), createVideo)

videoRouter.delete('/:video_id', middleware.verifyToken, destroyVideo)

// getOne
videoRouter.get('/resource/:public_id', middleware.verifyToken, getVideo)

// getOne
videoRouter.patch('/:video_id', middleware.verifyToken, updateVideo)

export default videoRouter