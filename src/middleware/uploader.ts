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

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads',
    resource_type: 'auto', // để upload với những file khác nhau
    limit: '10mb'
  } as CustomParams
})

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'video/mp4',
    'video/mpeg',
    'video/webm',
    'audio/mp3',
    'audio/wav',
    'audio/ogg',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ]
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new Error(
        'Chỉ cho phép upload file ảnh, video hoặc âm thanh với định dạng jpeg, png, mp4, mpeg, ogg, webm, mov, mp3, wav, hoặc docx, pptx, xlsx'
      ) as any,
      false
    )
  }
  console.log('File accepted:', file.mimetype)
  cb(null, true)
}

const uploadCloud: Multer = multer({ storage, fileFilter })

export default uploadCloud
