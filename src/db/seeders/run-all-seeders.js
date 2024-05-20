'use strict'
/** @type {import('sequelize-cli').Migration} */

const UserSeeder = require('./user-seeder')
const ProfileSeeder = require('./profile-seeder')
const InterestSeeder = require('./interest-seeder')
const UserInterestSeeder = require('./user-interest-seeder')

module.exports = {
  async up(queryInterface, Sequelize) {
    await UserSeeder.up(queryInterface, Sequelize)
    await ProfileSeeder.up(queryInterface, Sequelize)
    await InterestSeeder.up(queryInterface, Sequelize)
    await UserInterestSeeder.up(queryInterface, Sequelize)
  },

  async down(queryInterface, Sequelize) {
    await UserInterestSeeder.down(queryInterface, Sequelize)
    await InterestSeeder.down(queryInterface, Sequelize)
    await ProfileSeeder.down(queryInterface, Sequelize)
    await UserSeeder.down(queryInterface, Sequelize)
  }
}
