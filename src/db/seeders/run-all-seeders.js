'use strict'
/** @type {import('sequelize-cli').Migration} */

const UserSeeder = require('./user-seeder')
const NotificationSeeder = require('./notification-seeder')
const StorySeeder = require('./story-seeder')
const ProfileSeeder = require('./profile-seeder')
const FanpageSeeder = require('./fanpage-seeder')
const InterestSeeder = require('./interest-seeder')
const UserInterestSeeder = require('./user-interest-seeder')
const FriendshipSeeders = require('./friendship-seeder')

module.exports = {
  async up(queryInterface, Sequelize) {
    await UserSeeder.up(queryInterface, Sequelize)
    await ProfileSeeder.up(queryInterface, Sequelize)
    await FanpageSeeder.up(queryInterface, Sequelize)
    await InterestSeeder.up(queryInterface, Sequelize)
    await UserInterestSeeder.up(queryInterface, Sequelize)
    await FriendshipSeeders.up(queryInterface, Sequelize)
    await NotificationSeeder.up(queryInterface, Sequelize)
    await StorySeeder.up(queryInterface, Sequelize)
  },

  async down(queryInterface, Sequelize) {
    await StorySeeder.down(queryInterface, Sequelize)
    await NotificationSeeder.down(queryInterface, Sequelize)
    await FriendshipSeeders.down(queryInterface, Sequelize)
    await UserInterestSeeder.down(queryInterface, Sequelize)
    await InterestSeeder.down(queryInterface, Sequelize)
    await FanpageSeeder.down(queryInterface, Sequelize)
    await ProfileSeeder.down(queryInterface, Sequelize)
    await UserSeeder.down(queryInterface, Sequelize)
  }
}
