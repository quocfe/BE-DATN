'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Profiles',
      [
        {
          profile_id: '0a303a83-9e0c-4864-9115-72345ab30075',
          phone_number: null,
          date_of_birth: null,
          biography: 'kanisdev web front-end developer',
          profile_picture: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg',
          cover_photo: 'https://wallpapers.com/images/featured/4k-gaming-background-bud9k5ffqi3r2ds9.jpg',
          home_town: '',
          education: '',
          job: '',
          alias: '',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profiles', null, {})
  }
}
