import { QueryInterface } from 'sequelize'
import RoleSeeder from './role-seeder'
import AccountSeeder from './account-seeder'
import UserSeeder from './user-seeder'
import ProfileSeeder from './profile-seeder'
import InterestSeeder from './interest-seeder'
import UserInterestSeeder from './user-interest-seeder'
import FriendshipSeeder from './friendship-seeder'
import SearchHistorySeeder from './search-history-seeder'
import PostSeeder from './post-seeder'
import PostMediaResourceSeeder from './post-media-resource-seeder'
import PostCommentSeeder from './post-comment-seeder'
import PostCommentReplySeeder from './post-comment-reply-seeder'
import PostReactionSeeder from './post-reaction-seeder'

export default {
  async up(queryInterface: QueryInterface) {
    await RoleSeeder.up(queryInterface)
    await AccountSeeder.up(queryInterface)
    await UserSeeder.up(queryInterface)
    await ProfileSeeder.up(queryInterface)
    await InterestSeeder.up(queryInterface)
    await UserInterestSeeder.up(queryInterface)
    await FriendshipSeeder.up(queryInterface)
    await SearchHistorySeeder.up(queryInterface)
    await PostSeeder.up(queryInterface)
    await PostMediaResourceSeeder.up(queryInterface)
    await PostCommentSeeder.up(queryInterface)
    await PostCommentReplySeeder.up(queryInterface)
    await PostReactionSeeder.up(queryInterface)
  },

  async down(queryInterface: QueryInterface) {
    await PostReactionSeeder.down(queryInterface)
    await PostCommentReplySeeder.down(queryInterface)
    await PostCommentSeeder.down(queryInterface)
    await PostMediaResourceSeeder.down(queryInterface)
    await PostSeeder.down(queryInterface)
    await SearchHistorySeeder.down(queryInterface)
    await FriendshipSeeder.down(queryInterface)
    await UserInterestSeeder.down(queryInterface)
    await InterestSeeder.down(queryInterface)
    await ProfileSeeder.down(queryInterface)
    await UserSeeder.down(queryInterface)
    await AccountSeeder.down(queryInterface)
    await RoleSeeder.down(queryInterface)
  }
}
