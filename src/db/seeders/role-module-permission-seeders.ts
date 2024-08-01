import { QueryInterface } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      'RoleModulePermissions',
      [
        // User Management
        { id: 1, role_id: 'manager-admin', module_id: 'user-module', permission_id: 'p-view' },
        { id: 2, role_id: 'manager-admin', module_id: 'user-module', permission_id: 'p-add' },
        { id: 3, role_id: 'manager-admin', module_id: 'user-module', permission_id: 'p-edit' },
        { id: 4, role_id: 'manager-admin', module_id: 'user-module', permission_id: 'p-delete' },

        // Post Management
        { id: 5, role_id: 'manager-admin', module_id: 'post-module', permission_id: 'p-view' },
        { id: 6, role_id: 'manager-admin', module_id: 'post-module', permission_id: 'p-add' },
        { id: 7, role_id: 'manager-admin', module_id: 'post-module', permission_id: 'p-edit' },
        { id: 8, role_id: 'manager-admin', module_id: 'post-module', permission_id: 'p-delete' },

        // Message Management
        { id: 9, role_id: 'manager-admin', module_id: 'support-module', permission_id: 'p-view' },
        { id: 10, role_id: 'manager-admin', module_id: 'support-module', permission_id: 'p-add' },
        { id: 11, role_id: 'manager-admin', module_id: 'support-module', permission_id: 'p-edit' },
        { id: 12, role_id: 'manager-admin', module_id: 'support-module', permission_id: 'p-delete' },

        // Content Management
        { id: 13, role_id: 'manager-admin', module_id: 'content-module', permission_id: 'p-view' },
        { id: 14, role_id: 'manager-admin', module_id: 'content-module', permission_id: 'p-add' },
        { id: 15, role_id: 'manager-admin', module_id: 'content-module', permission_id: 'p-edit' },
        { id: 16, role_id: 'manager-admin', module_id: 'content-module', permission_id: 'p-delete' },

        // Customer Support
        { id: 17, role_id: 'manager-admin', module_id: 'support-module', permission_id: 'p-view' },
        { id: 18, role_id: 'manager-admin', module_id: 'support-module', permission_id: 'p-add' },
        { id: 19, role_id: 'manager-admin', module_id: 'support-module', permission_id: 'p-edit' },
        { id: 20, role_id: 'manager-admin', module_id: 'support-module', permission_id: 'p-delete' }
      ],
      {}
    )
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('RoleModulePermissions', {}, {})
  }
}
