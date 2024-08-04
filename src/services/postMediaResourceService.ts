import models from '../db/models'
import { MediaType } from '../types/postMediaResource.type'

class postMediaResourceService {
  // Thêm mới tài nguyên bài đăng
  async addPostMediaResource(post_id: string, media_url: string, media_type: MediaType) {
    await models.PostMediaResource.create({
      post_id,
      media_url,
      media_type
    })
  }
}

export default new postMediaResourceService()
