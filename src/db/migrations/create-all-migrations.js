'use strict'
/** @type {import('sequelize-cli').Migration} */

const RoleMigration = require('./create-table-role')
const AccountMigration = require('./create-table-account')
const UserMigration = require('./create-table-user')
const ProfileMigration = require('./create-table-profile')
const InterestMigration = require('./create-table-interest')
const UserInterestsMigration = require('./create-table-user-interests')
const VideoMigration = require('./create-table-video')
const CommnetVideoMigration = require('./create-table-comment-video')
const FriendShipMigration = require('./create-table-friendship')
const LikeVideoMigration = require('./create-table-like-video')
const FavoriteVideoMigration = require('./create-table-favorite-video')

module.exports = {
  async up(queryInterface, Sequelize) {
    // Role
    await RoleMigration.up(queryInterface, Sequelize)
    // Account
    await AccountMigration.up(queryInterface, Sequelize)
    // User
    await UserMigration.up(queryInterface, Sequelize)
    // Profile
    await ProfileMigration.up(queryInterface, Sequelize)
    // Interests
    await InterestMigration.up(queryInterface, Sequelize)
    // UserInterests
    await UserInterestsMigration.up(queryInterface, Sequelize)
    //  Video
    await VideoMigration.up(queryInterface, Sequelize)
    //  Comment Video
    await CommnetVideoMigration.up(queryInterface, Sequelize)
    //  Like Video
    await LikeVideoMigration.up(queryInterface, Sequelize)
    // Friendship
    await FriendShipMigration.up(queryInterface, Sequelize)
    // Favorite Video
    await FavoriteVideoMigration.up(queryInterface, Sequelize)
  },

  async down(queryInterface, Sequelize) {
    // Friendship
    await FriendShipMigration.up(queryInterface, Sequelize)
    // UserInterests
    await UserInterestsMigration.down(queryInterface, Sequelize)
    // Interests
    await InterestMigration.down(queryInterface, Sequelize)
    // Profile
    await ProfileMigration.down(queryInterface, Sequelize)
    // User
    await UserMigration.down(queryInterface, Sequelize)
    // Video
    await VideoMigration.up(queryInterface, Sequelize)
    // Commnet Video
    await CommnetVideoMigration.up(queryInterface, Sequelize)
    //  Like Video
    await LikeVideoMigration.up(queryInterface, Sequelize)
    // Account
    await AccountMigration.down(queryInterface, Sequelize)
    // Role
    await RoleMigration.down(queryInterface, Sequelize)
    // Favorite Video
    await FavoriteVideoMigration.down(queryInterface, Sequelize)
  }
}
