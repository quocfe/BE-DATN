import { QueryInterface } from 'sequelize'
import RoleMigration from './create-table-role'
import AccountMigration from './create-table-account'
import UserMigration from './create-table-user'
import ProfileMigration from './create-table-profile'
import InterestMigration from './create-table-interest'
import UserInterestsMigration from './create-table-user-interests'
import FriendShipMigration from './create-table-friendship'
import SearchHistoryMigration from './create-table-search-history'

export default {
  async up(queryInterface: QueryInterface) {
    await RoleMigration.up(queryInterface)
    await AccountMigration.up(queryInterface)
    await UserMigration.up(queryInterface)
    await ProfileMigration.up(queryInterface)
    await InterestMigration.up(queryInterface)
    await UserInterestsMigration.up(queryInterface)
    await FriendShipMigration.up(queryInterface)
    await SearchHistoryMigration.up(queryInterface)
  },

  async down(queryInterface: QueryInterface) {
    await SearchHistoryMigration.down(queryInterface)
    await FriendShipMigration.down(queryInterface)
    await UserInterestsMigration.down(queryInterface)
    await InterestMigration.down(queryInterface)
    await ProfileMigration.down(queryInterface)
    await UserMigration.down(queryInterface)
    await AccountMigration.down(queryInterface)
    await RoleMigration.down(queryInterface)
  }
}
