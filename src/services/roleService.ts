import models from '../db/models'

class RoleService {
  async getAllRoles() {
    const roles = await models.Role.findAll()

    return {
      message: 'Danh sách vai trò',
      data: {
        roles
      }
    }
  }
}

export default new RoleService()
