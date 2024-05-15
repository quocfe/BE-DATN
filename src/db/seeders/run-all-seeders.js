'use strict'
/** @type {import('sequelize-cli').Migration} */

const UserSeeder = require('./user-seeder')
const InterestSeeder = require('./interest-seeder')
const ProfileSeeder = require('./profile-seeder')

module.exports = {
  async up(queryInterface, Sequelize) {
    await UserSeeder.up(queryInterface, Sequelize)
    await InterestSeeder.up(queryInterface, Sequelize)
    await ProfileSeeder.up(queryInterface, Sequelize)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profiles', null, {})
    await queryInterface.bulkDelete('Interests', null, {})
    await queryInterface.bulkDelete('Users', null, {})
  }
}
