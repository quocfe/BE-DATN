import { UploadApiResponse, DeleteApiResponse, ResourceApiResponse } from 'cloudinary'
import cloudinary from '../config/cloudinary'
import fs from 'fs'
import 'dotenv/config'

const upload_preset = process.env.CLOUDINAR_UPLOAD_PREST as string

/**
 *
 * @resource_type The type format is uploaded to cloudinary
 * @public_id Path where the file will be saved on cloudinary
 * @eager_async Specifies that eager transformations will be performed asynchronously (not waiting for immediate results).
 * @eager_notification_url This URL will receive notifications when asynchronous transformations in eager complete.
 * This is typically an endpoint in your application that handles notifications.
 *
 */

const cloudinaryUploadVideo = async (file: Express.Multer.File): Promise<UploadApiResponse> => {
  const filePath = file.path
  // Hàm tải lên video theo phần lên cloudinary
  async function uploadVideoChunk(startByte: number, endByte: number): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(filePath, { start: startByte, end: endByte })

      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'video', upload_preset },
        (error: any, result: UploadApiResponse) => {
          if (error) {
            return reject(error)
          }
          resolve(result)
        }
      )

      let uploadedBytes = 0

      readStream.on('data', (chunk) => {
        uploadedBytes += chunk.length
        console.log(`Uploaded ${uploadedBytes} bytes of ${fileSize} bytes`)
      })

      readStream.on('end', () => {
        console.log('Finished uploading chunk')
      })

      readStream.pipe(uploadStream)
    })
  }

  // tính toán để chia nhỏ video
  const stats = fs.statSync(filePath)
  const fileSize = stats.size
  const chunkSize = 10 * 1024 * 1024 // 10MB
  let startByte = 0
  let endByte = chunkSize - 1
  let uploadResult: UploadApiResponse | null = null

  try {
    while (startByte < fileSize) {
      uploadResult = await uploadVideoChunk(startByte, endByte)
      startByte = endByte + 1
      endByte = Math.min(startByte + chunkSize - 1, fileSize - 1)
    }
    if (uploadResult === null) {
      throw new Error('Upload result is null')
    }
    return uploadResult
  } catch (error) {
    console.error('Upload failed:', error)
    throw error // Re-throw the error after logging it
  } finally {
    // Xóa tệp tạm thời sau khi tải lên, dù thành công hay thất bại
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Không thể xóa tệp tạm thời:', err)
      } else {
        console.log('Tệp tạm thời đã được xóa')
      }
    })
  }
}

const destroyCloudinary = (public_id: string, resource_type?: string) => {
  return new Promise<DeleteApiResponse>((resolve, reject) => {
    cloudinary.uploader.destroy(
      public_id,
      resource_type && {
        resource_type
      },
      (error: any, result: any) => {
        if (error) {
          console.log(error)
          reject(error)
        }
        console.log(result)
        resolve(result)
      }
    )
  })
}

const cloudinaryGetResource = (public_id: string) => {
  return new Promise<ResourceApiResponse>((resolve, reject) => {
    cloudinary.api.resource(
      public_id,
      {
        image_metadata: true,
        resource_type: 'video'
      },
      (error: any, result: any) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      }
    )
  })
}

export { cloudinaryUploadVideo, destroyCloudinary, cloudinaryGetResource }
