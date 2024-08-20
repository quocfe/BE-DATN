import { QueryInterface } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      'AccountModulePermissions',
      [
        {
          id: 1,
          account_id: 'a-user-admin',
          module_id: 'user-module',
          permission_id: 'p-view'
        },
        {
          id: 2,
          account_id: 'a-user-admin',
          module_id: 'user-module',
          permission_id: 'p-add'
        },
        {
          id: 3,
          account_id: 'a-user-admin',
          module_id: 'user-module',
          permission_id: 'p-edit'
        },
        {
          id: 4,
          account_id: 'a-user-admin',
          module_id: 'user-module',
          permission_id: 'p-delete'
        },
        {
          id: 5,
          account_id: 'a-user-admin',
          module_id: 'post-module',
          permission_id: 'p-view'
        },
        {
          id: 6,
          account_id: 'a-user-admin',
          module_id: 'post-module',
          permission_id: 'p-add'
        },
        {
          id: 7,
          account_id: 'a-message-admin',
          module_id: 'message-module',
          permission_id: 'p-view'
        },
        {
          id: 8,
          account_id: 'a-message-admin',
          module_id: 'message-module',
          permission_id: 'p-add'
        },
        {
          id: 9,
          account_id: 'a-message-admin',
          module_id: 'message-module',
          permission_id: 'p-edit'
        },
        {
          id: 10,
          account_id: 'a-message-admin',
          module_id: 'message-module',
          permission_id: 'p-delete'
        }
      ],
      {}
    )
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('AccountModulePermissions', {}, {})
  }
}
