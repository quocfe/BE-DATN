import { QueryInterface } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      'Permissions',
      [
        {
          permission_id: 'p-view',
          name: 'view',
          display_name: 'Xem'
        },
        {
          permission_id: 'p-add',
          name: 'add',
          display_name: 'Thêm'
        },
        {
          permission_id: 'p-edit',
          name: 'edit',
          display_name: 'Sửa'
        },
        {
          permission_id: 'p-delete',
          name: 'delete',
          display_name: 'Xóa'
        }
      ],
      {}
    )
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('Permissions', {}, {})
  }
}
