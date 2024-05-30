import 'dotenv/config'
import express, { Express, urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import initialRoutes from './routes/v1'
import Middleware from './middleware'
import db from './connection'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

import { setupModelRelationships } from './db/models'
const app: Express = express()
const PORT = process.env.PORT || 5000
const BASE_URL = process.env.BASE_URL || 'http://localhost'

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(
  cors({
    origin: `http://localhost:8080`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
)

app.use(initialRoutes)

app.use(Middleware.errorHandling)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../imgs')
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true })
    }
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const safeFileName = file.originalname.replace(/[^a-z0-9.]/gi, '_').toLowerCase()
    cb(null, uniqueSuffix + '-' + safeFileName)
  }
})
const upload = multer({ storage: storage })
app.post('/upload-avatar', upload.single('avatar'), async (req: any, res: any) => {
  try {
    const avatarFileName = req.file.filename
    res.json({ message: 'Avatar updated successfully', avatarFileName })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})
app.use(express.static('./imgs'))

db.authenticate()
  .then(() => {
    setupModelRelationships()
    console.log('[INFO] Kết nối thành công đến cơ sở dữ liệu.')
    app.listen(PORT, () => {
      console.log(`[INFO] Server đã bắt đầu lắng nghe yêu cầu từ máy khách tại ${BASE_URL}:${PORT}`)
    })
  })
  .catch((error: any) => {
    console.error('[ERROR] Không thể kết nối đến cơ sở dữ liệu:', error)
  })
