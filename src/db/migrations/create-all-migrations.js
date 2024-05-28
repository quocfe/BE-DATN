'use strict'
/** @type {import('sequelize-cli').Migration} */

const UserMigration = require('./create-table-user')
const ProfileMigration = require('./create-table-profile')
const InterestMigration = require('./create-table-interest')
const UserInterestsMigration = require('./create-table-user-interests')
const FriendShipMigration = require('./create-table-friendship')
const GroupMessageMigration = require('./create-table-groupMessage')
const MemberGroupMigration = require('./create-table-memberGroup')
const MessageMigration = require('./create-table-message')
const ReactMessageMigration = require('./create-table-reactMessage')
const SeenMessageMigration = require('./create-table-seenMessage')

module.exports = {
  async up(queryInterface, Sequelize) {
    // User
    await UserMigration.up(queryInterface, Sequelize)
    // Profile
    await ProfileMigration.up(queryInterface, Sequelize)
    // Interests
    await InterestMigration.up(queryInterface, Sequelize)
    // UserInterests
    await UserInterestsMigration.up(queryInterface, Sequelize)
    // Friendship
    await FriendShipMigration.up(queryInterface, Sequelize)
    // GroupMessageMigration
    await GroupMessageMigration.up(queryInterface, Sequelize)
    // MemberGroup
    await MemberGroupMigration.up(queryInterface, Sequelize)
    // MessageMigration
    await MessageMigration.up(queryInterface, Sequelize)
    // ReactMessageMigration
    await ReactMessageMigration.up(queryInterface, Sequelize)
    // SeenMessageMigration
    await SeenMessageMigration.up(queryInterface, Sequelize)
  },

  async down(queryInterface, Sequelize) {
    // SeenMessageMigration
    await SeenMessageMigration.down(queryInterface, Sequelize)
    // ReactMessageMigration
    await ReactMessageMigration.down(queryInterface, Sequelize)
    // MessageMigration
    await MessageMigration.down(queryInterface, Sequelize)
    // MemberGroup
    await MemberGroupMigration.down(queryInterface, Sequelize)
    // GroupMessageMigration
    await GroupMessageMigration.down(queryInterface, Sequelize)
    // FriendShip
    await FriendShipMigration.down(queryInterface, Sequelize)
    // UserInterests
    await UserInterestsMigration.down(queryInterface, Sequelize)
    // Interests
    await InterestMigration.down(queryInterface, Sequelize)
    // Profile
    await ProfileMigration.down(queryInterface, Sequelize)
    // User
    await UserMigration.down(queryInterface, Sequelize)
    // GroupMessageMigration
    await GroupMessageMigration.up(queryInterface, Sequelize)
    // MemberGroup
    await MemberGroupMigration.up(queryInterface, Sequelize)
    // MessageMigration
    await MessageMigration.up(queryInterface, Sequelize)
    // ReactMessageMigration
    await ReactMessageMigration.up(queryInterface, Sequelize)
    // SeenMessageMigration
    await SeenMessageMigration.up(queryInterface, Sequelize)
  }
}
