import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage, Options } from 'multer-storage-cloudinary'
import { FileFilterCallback, Multer } from 'multer'
import multer from 'multer'
import dotenv from 'dotenv'

dotenv.config()

interface CustomParams extends Options {
  folder: string
  resource_type: string
  limit: string
}

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true // Khuyến khích sử dụng HTTPS
})

// Cấu hình lưu trữ Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req: Express.Request, file: Express.Multer.File) => {
    return {
      folder: 'uploads', // Thay đổi tên thư mục nếu cần
      resource_type: file.mimetype.startsWith('video/') ? 'video' : 'image' // Phân loại tài nguyên dựa trên MIME type
    } as CustomParams
  }
})

// Bộ lọc tệp để chỉ cho phép định dạng hình ảnh và video cụ thể
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4', 'video/mpeg', 'video/webm']

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new Error(`Chỉ cho phép upload file ảnh hoặc video với định dạng: ${allowedMimeTypes.join(', ')}`) as any,
      false
    )
  }

  cb(null, true)
}

// Khởi tạo multer với cấu hình lưu trữ và bộ lọc
const uploadCloud = multer({ storage, fileFilter, limits: { fileSize: 100 * 1024 * 1024 } })

export default uploadCloud
