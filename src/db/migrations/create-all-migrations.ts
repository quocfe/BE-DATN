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
// Role Permissions
import ModuleMigration from './create-table-module'
import PermissionMigration from './create-table-permission'
import AccountModulePermissionMigtation from './create-table-account-module-permission'
import RoleModulePermissionMigration from './create-table-role-module-permission'
import GroupMessageMigration from './create-table-groupMessage'
import MemberGroupMigration from './create-table-memberGroup'
import MessageMigration from './create-table-message'
import ReactMessageMigration from './create-table-reactMessage'
import SeenMessageMigration from './create-table-seenMessage'
import RecallMessageMigration from './create-table-recallMessage'
import NotifyGroupMessageMigration from './create-table-notifyGroupMessage'
import DeleteGroupMessageMigration from './create-table-deleteGroupMessage'
import ReportMessageMigration from './create-table-reportMessage'
import FanpageMigration from './create-table-fanpage'
import FanpageMemberMigration from './create-table-fanpage-member'
import VideoMigration from './create-table-video'
import CommnetVideoMigration from './create-table-comment-video'
import LikeVideoMigration from './create-table-like-video'
import FavoriteVideoMigration from './create-table-favorite-video'
import VideoReportMigration from './create-table-video-report'
import StoryMigration from './create-table-story'

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
    await FanpageMigration.up(queryInterface)
    await PostMigration.up(queryInterface)
    await PostMediaResourceMigration.up(queryInterface)
    await PostCommentMigration.up(queryInterface)
    await PostCommentReplyMigration.up(queryInterface)
    await PostReactionMigration.up(queryInterface)
    await PostShareMigration.up(queryInterface)
    await PostReportMigration.up(queryInterface)
    await ModuleMigration.up(queryInterface)
    await PermissionMigration.up(queryInterface)
    await AccountModulePermissionMigtation.up(queryInterface)
    await RoleModulePermissionMigration.up(queryInterface)
    await GroupMessageMigration.up(queryInterface)
    await MemberGroupMigration.up(queryInterface)
    await MessageMigration.up(queryInterface)
    await ReactMessageMigration.up(queryInterface)
    await SeenMessageMigration.up(queryInterface)
    await RecallMessageMigration.up(queryInterface)
    await NotifyGroupMessageMigration.up(queryInterface)
    await DeleteGroupMessageMigration.up(queryInterface)
    await ReportMessageMigration.up(queryInterface)
    await FanpageMemberMigration.up(queryInterface)
    await VideoMigration.up(queryInterface)
    await CommnetVideoMigration.up(queryInterface)
    await LikeVideoMigration.up(queryInterface)
    await FriendShipMigration.up(queryInterface)
    await FavoriteVideoMigration.up(queryInterface)
    await VideoReportMigration.up(queryInterface)
    await StoryMigration.up(queryInterface)
  },

  async down(queryInterface: QueryInterface) {
    await VideoMigration.down(queryInterface)
    await CommnetVideoMigration.down(queryInterface)
    await LikeVideoMigration.down(queryInterface)
    await FavoriteVideoMigration.down(queryInterface)
    await VideoReportMigration.down(queryInterface)
    await ReportMessageMigration.down(queryInterface)
    await DeleteGroupMessageMigration.down(queryInterface)
    await NotifyGroupMessageMigration.down(queryInterface)
    await SeenMessageMigration.down(queryInterface)
    await ReactMessageMigration.down(queryInterface)
    await MessageMigration.down(queryInterface)
    await MemberGroupMigration.down(queryInterface)
    await GroupMessageMigration.down(queryInterface)
    await RoleModulePermissionMigration.down(queryInterface)
    await AccountModulePermissionMigtation.down(queryInterface)
    await PermissionMigration.down(queryInterface)
    await ModuleMigration.down(queryInterface)
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
    await FanpageMemberMigration.down(queryInterface)
    await FanpageMigration.down(queryInterface)
    await ProfileMigration.down(queryInterface)
    await UserMigration.down(queryInterface)
    await AccountMigration.down(queryInterface)
    await RoleMigration.down(queryInterface)
    await StoryMigration.down(queryInterface)
  }
}
