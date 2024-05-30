'use strict'
/** @type {import('sequelize-cli').Migration} */

const UserMigration = require('./create-table-user')
const StoryMigration = require('./create-table-story')
const FriendShipMigration = require('./create-table-friendship')
const NotificationMigration = require('./create-table-notification')
const ProfileMigration = require('./create-table-profile')
const InterestMigration = require('./create-table-interest')
const UserInterestsMigration = require('./create-table-user-interests')
const FanpageMigration = require('./create-table-fanpage')
module.exports = {
  async up(queryInterface, Sequelize) {
    await UserMigration.up(queryInterface, Sequelize)
    await ProfileMigration.up(queryInterface, Sequelize)
    await FanpageMigration.up(queryInterface, Sequelize)
    await InterestMigration.up(queryInterface, Sequelize)
    await UserInterestsMigration.up(queryInterface, Sequelize)
    await FriendShipMigration.up(queryInterface, Sequelize)
    await StoryMigration.up(queryInterface, Sequelize)
    await NotificationMigration.up(queryInterface, Sequelize)
  },

  async down(queryInterface, Sequelize) {
    await NotificationMigration.down(queryInterface, Sequelize)
    await StoryMigration.down(queryInterface, Sequelize)
    await FriendShipMigration.down(queryInterface, Sequelize)
    await UserInterestsMigration.down(queryInterface, Sequelize)
    await InterestMigration.down(queryInterface, Sequelize)
    await FanpageMigration.down(queryInterface, Sequelize)
    await ProfileMigration.down(queryInterface, Sequelize)
    await UserMigration.down(queryInterface, Sequelize)
  }
}
