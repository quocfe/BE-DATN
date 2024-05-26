'use strict'
/** @type {import('sequelize-cli').Migration} */
const { hashSync, genSaltSync } = require('bcryptjs')
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          first_name: 'Kan',
          last_name: 'Kan',
          email: 'kanisdev@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 0,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          first_name: 'Luffy',
          last_name: 'Monkey D',
          email: 'luffy@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 0,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          first_name: 'Zoro',
          last_name: 'Roronoa',
          email: 'zoro@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 0,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'sanji-22c73-f703-4b16-847d-f61bae05-onepiece',
          first_name: 'Sanji',
          last_name: 'Vinsmoke',
          email: 'sanji@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 0,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'nami-22c73-f703-4b16-847d-f61bae05-onepiece',
          first_name: 'Nami',
          last_name: 'Rico',
          email: 'nami@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
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
