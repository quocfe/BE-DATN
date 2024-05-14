'use strict'
/** @type {import('sequelize-cli').Migration} */

const UserSeeder = require('./user-seeder')

module.exports = {
  async up(queryInterface, Sequelize) {
    await UserSeeder.up(queryInterface, Sequelize)
  },

  async down(queryInterface, Sequelize) {}
}
