'use strict'
/** @type {import('sequelize-cli').Migration} */

const UserMigration = require('./create-table-user')

module.exports = {
  async up(queryInterface, Sequelize) {
    // User
    await UserMigration.up(queryInterface, Sequelize)
  },

  async down(queryInterface, Sequelize) {
    // User
    await UserMigration.down(queryInterface, Sequelize)
  }
}
