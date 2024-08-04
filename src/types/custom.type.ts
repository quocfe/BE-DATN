export interface CustomRequest extends Request {
  body: any
  params: any
  file?: Files
  files?: Files
  user?: {
    user_id: string
  }
}

export type Files = {
  images: Express.Multer.File[]
  videos: Express.Multer.File[]
  media: Express.Multer.File
}
