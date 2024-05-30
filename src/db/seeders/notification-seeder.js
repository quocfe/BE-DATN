'use strict'
/** @type {import('sequelize-cli').Migration} */
const { hashSync, genSaltSync } = require('bcryptjs')
const { DATE } = require('sequelize')
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Notifications',
      [
        {
            notification_id: 'n1234567890',
            user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
            message: 'Bạn nhận được một tin nhắn mới',
            is_read: false,
            notification_date: 10/10/2003
          },
          {
            notification_id: 'n0987654321',
            user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
            message: 'Bạn đã đọc tin nhắn mới',
            is_read: true,
            notification_date: 21/5/2024
          }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notifications', null, {})
  }
}
