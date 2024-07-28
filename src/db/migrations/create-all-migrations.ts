import { QueryInterface } from 'sequelize'
import RoleMigration from './create-table-role'
import AccountMigration from './create-table-account'
import UserMigration from './create-table-user'
import ProfileMigration from './create-table-profile'
import InterestMigration from './create-table-interest'
import UserInterestsMigration from './create-table-user-interests'
import FriendShipMigration from './create-table-friendship'
import SearchHistoryMigration from './create-table-search-history'
import PostMigration from './create-table-post'
import PostMediaResourceMigration from './create-table-post-media-resource'
import PostCommentMigration from './create-table-post-comment'
import PostCommentReplyMigration from './create-table-post-comment-reply'
import PostReactionMigration from './create-table-post-reaction'
import PostShareMigration from './create-table-post-share'
import PostReportMigration from './create-table-post-report'

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
    await PostMigration.up(queryInterface)
    await PostMediaResourceMigration.up(queryInterface)
    await PostCommentMigration.up(queryInterface)
    await PostCommentReplyMigration.up(queryInterface)
    await PostReactionMigration.up(queryInterface)
    await PostShareMigration.up(queryInterface)
    await PostReportMigration.up(queryInterface)
  },

  async down(queryInterface: QueryInterface) {
    await PostShareMigration.down(queryInterface)
    await PostReportMigration.down(queryInterface)
    await PostReactionMigration.down(queryInterface)
    await PostCommentReplyMigration.down(queryInterface)
    await PostCommentMigration.down(queryInterface)
    await PostMediaResourceMigration.down(queryInterface)
    await PostMigration.down(queryInterface)
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
