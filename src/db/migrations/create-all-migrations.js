'use strict'
/** @type {import('sequelize-cli').Migration} */

const RoleMigration = require('./create-table-role.js')
const UserMigration = require('./create-table-user')

module.exports = {
  async up(queryInterface, Sequelize) {
    // Role
    await RoleMigration.up(queryInterface, Sequelize)
    // User
    await UserMigration.up(queryInterface, Sequelize)
  },

  async down(queryInterface, Sequelize) {
    // User
    await UserMigration.down(queryInterface, Sequelize)
    // Role
    await RoleMigration.down(queryInterface, Sequelize)
  }
}
