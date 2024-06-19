import { QueryInterface } from 'sequelize'
import RoleSeeder from './role-seeder'
import AccountSeeder from './account-seeder'
import UserSeeder from './user-seeder'
import ProfileSeeder from './profile-seeder'
import InterestSeeder from './interest-seeder'
import UserInterestSeeder from './user-interest-seeder'
import FriendshipSeeder from './friendship-seeder'

export default {
  async up(queryInterface: QueryInterface) {
    await RoleSeeder.up(queryInterface)
    await AccountSeeder.up(queryInterface)
    await UserSeeder.up(queryInterface)
    await ProfileSeeder.up(queryInterface)
    await InterestSeeder.up(queryInterface)
    await UserInterestSeeder.up(queryInterface)
    await FriendshipSeeder.up(queryInterface)
  },

  async down(queryInterface: QueryInterface) {
    await FriendshipSeeder.down(queryInterface)
    await UserInterestSeeder.down(queryInterface)
    await InterestSeeder.down(queryInterface)
    await ProfileSeeder.down(queryInterface)
    await UserSeeder.down(queryInterface)
    await AccountSeeder.down(queryInterface)
    await RoleSeeder.down(queryInterface)
  }
}
