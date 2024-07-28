'use strict'
/** @type {import('sequelize-cli').Migration} */
const { hashSync, genSaltSync } = require('bcryptjs')
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Accounts',
      [
        {
          account_id: 'xa1u-22c73-f703-4b16-847d-f61bae05-siqu',
          username: 'Cao Đình Can',
          email: 'super.admin@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          status: 'Đang hoạt động',
          last_login: '2024-05-29 06:38:22',
          profile_picture: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg',
          phone_number: '0373405375',
          address: 'Quảng Nam',
          date_of_birth: '2002-06-17',
          role_id: 'pi1ja-22c73-f703-4b16-847d-f61bae05-xha1'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Accounts', null, {})
  }
}
