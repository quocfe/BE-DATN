import 'dotenv/config'
import http from 'http'
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
//  app, httpServer từ socket, đéo đc xóa của tao
import { app, httpServer } from './sockets/socket'

const PORT = process.env.PORT || 5000
const BASE_URL = process.env.BASE_URL || 'http://localhost'

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(
  cors({
    origin: `http://localhost:8080`,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
  })
)

app.use(initialRoutes)
app.use(Middleware.errorHandling)
db.authenticate()
  .then(() => {
    setupModelRelationships()
    console.log('[INFO] Kết nối thành công đến cơ sở dữ liệu.')
    // httpServer từ socket, đéo đc xóa của tao
    httpServer.listen(PORT, () => {
      console.log(`[INFO] Server đã bắt đầu lắng nghe yêu cầu từ máy khách tại ${BASE_URL}:${PORT}`)
    })
  })
  .catch((error: any) => {
    console.error('[ERROR] Không thể kết nối đến cơ sở dữ liệu:', error)
  })
