import { QueryInterface } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          role_id: 'super-admin',
          name: 'Super Admin',
          description: 'Quản trị viên với quyền truy cập đầy đủ vào tất cả các tính năng và cài đặt của hệ thống.'
        },
        {
          role_id: 'manager-admin',
          name: 'User Admin',
          description:
            'Quản lý hệ thống với quyền hạn trong nhiều module nhưng không có quyền truy cập đầy đủ như Super Admin.'
        },
        {
          role_id: 'viewer-admin',
          name: 'Viewer Admin',
          description: 'Người xem với quyền chỉ xem nội dung và báo cáo mà không thể thay đổi dữ liệu.'
        },
        {
          role_id: 'support-admin',
          name: 'Support Admin',
          description: 'Vai trò hỗ trợ với quyền xử lý các yêu cầu và hỗ trợ khách hàng.'
        },
        {
          role_id: 'editor-admin',
          name: 'Editor Admin',
          description:
            'Người chỉnh sửa nội dung với quyền tạo, chỉnh sửa và xóa nội dung trong các module được chỉ định.'
        },
        {
          role_id: 'message-admin',
          name: 'Message Admin',
          description:
            'Người chỉnh sửa nội dung với quyền tạo, chỉnh sửa và xóa nội dung trong các module được chỉ định.'
        }
      ],
      {}
    )
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('Roles', {}, {})
  }
}
