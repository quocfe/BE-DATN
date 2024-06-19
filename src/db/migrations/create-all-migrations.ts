import { QueryInterface } from 'sequelize'
import RoleMigration from './create-table-role'
import AccountMigration from './create-table-account'
import UserMigration from './create-table-user'
import ProfileMigration from './create-table-profile'
import InterestMigration from './create-table-interest'
import UserInterestsMigration from './create-table-user-interests'
import FriendShipMigration from './create-table-friendship'

export default {
  async up(queryInterface: QueryInterface) {
    // Role
    await RoleMigration.up(queryInterface)
    // Account
    await AccountMigration.up(queryInterface)
    // User
    await UserMigration.up(queryInterface)
    // Profile
    await ProfileMigration.up(queryInterface)
    // Interests
    await InterestMigration.up(queryInterface)
    // UserInterests
    await UserInterestsMigration.up(queryInterface)
    // Friendship
    await FriendShipMigration.up(queryInterface)
  },

  async down(queryInterface: QueryInterface) {
    // Friendship
    await FriendShipMigration.up(queryInterface)
    // UserInterests
    await UserInterestsMigration.down(queryInterface)
    // Interests
    await InterestMigration.down(queryInterface)
    // Profile
    await ProfileMigration.down(queryInterface)
    // User
    await UserMigration.down(queryInterface)
    // Account
    await AccountMigration.down(queryInterface)
    // Role
    await RoleMigration.down(queryInterface)
  }
}
