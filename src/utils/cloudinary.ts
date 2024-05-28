import { v2 as cloudinary } from 'cloudinary'

// Lấy publicId từ url image or video
export function getPublicIdFromUrl(url: string) {
  const parts = url.split('/')
  const filename = parts[parts.length - 1]
  const publicId = 'uploads/' + filename.split('.')[0]
  return publicId
}

// Xóa ảnh, video bằng publicId
export async function deleteImageOrVideoByPublicId(publicId: string) {
  await cloudinary.uploader.destroy(publicId)
}
