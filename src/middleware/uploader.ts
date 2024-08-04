import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage, Options } from 'multer-storage-cloudinary'
import { FileFilterCallback, Multer } from 'multer'
import multer from 'multer'

interface CustomParams extends Options {
  folder: string
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads'
  } as CustomParams
})

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4', 'video/mpeg', 'video/webm']
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new Error('Chỉ cho phép upload file ảnh hoặc video với định dạng jpeg, png, mp4, mpeg, ogg, webm, mov') as any,
      false
    )
  }
  cb(null, true)
}

const uploadCloud: Multer = multer({ storage, fileFilter })

export default uploadCloud