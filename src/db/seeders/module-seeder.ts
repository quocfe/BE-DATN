import { QueryInterface } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      'Modules',
      [
        {
          module_id: 'user-module',
          name: 'User Management'
        },
        {
          module_id: 'role-module',
          name: 'Role Management'
        },
        {
          module_id: 'post-module',
          name: 'Post Management'
        },
        {
          module_id: 'content-module',
          name: 'Content Management'
        },
        {
          module_id: 'support-module',
          name: 'Customer Support'
        },
        {
          module_id: 'message-module',
          name: 'Message Management'
        }
      ],
      {}
    )
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('Modules', {}, {})
  }
}
