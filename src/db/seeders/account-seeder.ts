import { QueryInterface } from 'sequelize'
import { hashSync, genSaltSync } from 'bcryptjs'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      'Accounts',
      [
        {
          account_id: 'a-super-admin',
          username: 'Kan Dev',
          email: 'super.admin@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          status: 'Đang hoạt động',
          role_id: 'super-admin',
          last_login: '2024-05-29 06:38:22',
          profile_picture:
            'https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Anh-avatar-hoat-hinh-de-thuong-xinh-xan.jpg?1704788263223',
          phone_number: '0373405375',
          address: 'Quảng Nam',
          date_of_birth: '2002-06-17'
        },

        {
          account_id: 'a-user-admin',
          username: 'Cao Đình Can',
          email: 'user.admin@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          status: 'Đang hoạt động',
          role_id: 'manager-admin',
          last_login: '2024-05-29 06:38:22',
          profile_picture: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg',
          phone_number: '0373405375',
          address: 'Quảng Nam',
          date_of_birth: '2002-06-17'
        },
        {
          account_id: 'a-support-admin',
          username: 'Cao Đình Can',
          email: 'support.admin@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          status: 'Đang hoạt động',
          role_id: 'support-admin',
          last_login: '2024-05-29 06:38:22',
          profile_picture: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg',
          phone_number: '0373405375',
          address: 'Quảng Nam',
          date_of_birth: '2002-06-17'
        },
        {
          account_id: 'a-message-admin',
          username: 'Nguyễn Phú Quốc',
          email: 'message.admin@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          status: 'Đang hoạt động',
          role_id: 'message-admin',
          last_login: '2024-05-29 06:38:22',
          profile_picture: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg',
          phone_number: '0373405375',
          address: 'Quảng Nam',
          date_of_birth: '2002-06-17'
        }
      ],
      {}
    )
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('Accounts', {}, {})
  }
}
