'use strict'
/** @type {import('sequelize-cli').Migration} */
const { hashSync, genSaltSync } = require('bcryptjs')
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          user_id: 'lp322c73-f703-4b16-847d-f61bae053p9i',
          first_name: 'Luffy',
          last_name: 'Monkey D',
          email: 'luffy@gmail.com',
          password: hashSync('Luffy@2024', genSaltSync(10)),
          code: '',
          is_auth: true,
          expires: ''
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
