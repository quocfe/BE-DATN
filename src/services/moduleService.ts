import models from '../db/models'

class moduleService {
  async getAllModules() {
    const modules = await models.Module.findAll()

    return {
      message: 'Danh sách modules',
      data: {
        modules
      }
    }
  }
}

export default new moduleService()
