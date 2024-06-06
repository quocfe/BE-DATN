'use strict'
/** @type {import('sequelize-cli').Migration} */
const { hashSync, genSaltSync } = require('bcryptjs')
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          role_id: 'pi1ja-22c73-f703-4b16-847d-f61bae05-xha1',
          name: 'Super Admin',
          description: 'Quản trị viên cấp cao'
        },
        {
          role_id: 'lao1-22c73-f703-4b16-847d-f61bae05-xbaq',
          name: 'Content Admin',
          description: 'Quản trị viên nội dung'
        },
        {
          role_id: 'xu1i-22c73-f703-4b16-847d-f61bae05-ioqm',
          name: 'Sales Admin',
          description: 'Quản trị viên bán hàng'
        },
        {
          role_id: 'giup1-22c73-f703-4b16-847d-f61bae05-nxja1',
          name: 'Video Admin',
          description: 'Quản trị viên video'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {})
  }
}
