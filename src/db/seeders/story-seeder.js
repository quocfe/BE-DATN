'use strict'
/** @type {import('sequelize-cli').Migration} */
const { hashSync, genSaltSync } = require('bcryptjs')
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Stories',
      [
        {
          story_id: 's1234567890',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          text: 'Hôm nay là một ngày tuyệt vời!',
          content: 'https://example.com/image1.jpg',
          music: 'https://example.com/music1.mp3',
          story_view: 2,
          privacy: 'public',
          story_time: 21 / 5 / 2024,
          tag: 'happiness'
        },
        {
          story_id: 's0987654321',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          text: 'Cảm giác thật tuyệt vời khi ở bên gia đình!',
          content: 'https://example.com/image2.jpg',
          music: 'https://example.com/music2.mp3',
          story_view: 3,
          privacy: 'friends-only',
          story_time: 21 / 5 / 2024,
          tag: 'family'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stories', null, {})
  }
}
