import Notification from './Notification'
import Story from './Story'
import User from './User'
import Interest from './Interest'
import Profile from './Profile'
import Friendship from './Friendship'
import Video, { videoRelationships } from './Video'
import CommentVideo, { commentVideoRelationships } from './CommentVideo'
import LikeVideo from './LikeVideo'
import FavoriteVideos, { favoriteVideosRelationships } from './FavoriteVideos'
import VideoReport, { videoReportRelationships } from './VideoReport'
import HashTagsVideo, { hashTagsVideoRelationships } from './hashTagsVideo'
import GroupMessage from './GroupMessage'
import MemberGroup from './MemberGroup'
import ReactMessage from './ReactMessage'
import SeenMessage from './SeenMessage'
import Message from './Message'
import Role from './Role'
import Account from './Account'
import RecallMessage from './RecallMessage'
import NotifyGroupMessage from './NotifyGroupMessage'
import DeleteGroupMessage from './DeleteGroupMessage'
import ReportMessage from './ReportMessage'
import SearchHistory from './SearchHistory'
import Post from './Post'
import PostMediaResource from './PostMediaResource'
import PostComment from './PostComment'
import PostCommentReply from './PostCommentReply'
import PostReaction from './PostReaction'
import Module from './Module'
import Permission from './Permission'
import AccountModulePermission from './AccountModulePermission'
import RoleModulePermission from './RoleModulePermission'
import Fanpage from './Fanpage';

const roleRelationships = () => {
  Role.hasMany(Account, {
    foreignKey: 'role_id',
    as: 'accounts'
  })

  Role.belongsToMany(Module, {
    through: 'RoleModulePermissions',
    foreignKey: 'role_id',
    otherKey: 'module_id',
    as: 'modules'
  })

  Role.belongsToMany(Permission, {
    through: 'RoleModulePermissions',
    foreignKey: 'role_id',
    otherKey: 'permission_id'
  })
}

const accountRelationship = () => {
  Account.belongsTo(Role, {
    foreignKey: 'role_id',
    as: 'role'
  })

  Account.belongsToMany(Module, {
    through: 'AccountModulePermissions',
    foreignKey: 'account_id',
    otherKey: 'module_id',
    as: 'modules'
  })

  Account.belongsToMany(Permission, {
    through: 'AccountModulePermissions',
    foreignKey: 'account_id',
    otherKey: 'permission_id'
  })
}

const moduleRelationships = () => {
  Module.belongsToMany(Role, {
    through: 'RoleModulePermissions',
    foreignKey: 'module_id',
    otherKey: 'role_id'
  })

  Module.belongsToMany(Account, {
    through: 'AccountModulePermissions',
    foreignKey: 'module_id',
    otherKey: 'account_id'
  })

  // Module.belongsToMany(Permission, {
  //   through: 'RoleModulePermissions',
  //   foreignKey: 'module_id',
  //   otherKey: 'permission_id',
  //   as: 'permissions'
  // })

  Module.belongsToMany(Permission, {
    through: 'AccountModulePermissions',
    foreignKey: 'module_id',
    otherKey: 'permission_id',
    as: 'permissions'
  })
}

const permissionRelationships = () => {
  Permission.belongsToMany(Role, {
    through: 'RoleModulePermissions',
    foreignKey: 'permission_id',
    otherKey: 'role_id'
  })

  Permission.belongsToMany(Account, {
    through: 'AccountModulePermissions',
    foreignKey: 'permission_id',
    otherKey: 'account_id'
  })
}

// User Relationships
const userRelationships = () => {
  User.hasOne(Profile, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  })
  User.hasMany(Notification, {
    foreignKey: 'user_id',
    as: 'notifications'
  })
  User.belongsToMany(Interest, {
    through: 'UserInterests',
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  })

  User.belongsToMany(User, {
    through: 'Friendships',
    as: 'Friends',
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  })

  User.belongsToMany(User, {
    through: 'Friendships',
    as: 'UserFriends',
    foreignKey: 'friend_id',
    onDelete: 'CASCADE'
  })

  User.hasMany(Story, {
    foreignKey: 'user_id',
    as: 'stories'})
  User.hasMany(GroupMessage, { foreignKey: 'createdBy', as: 'GroupsMessage' })

  User.hasMany(MemberGroup, {
    foreignKey: 'user_id'
  })
  User.hasMany(SearchHistory, {
    foreignKey: 'user_id'
  })

  User.hasMany(Post, {
    foreignKey: 'user_id',
    as: 'posts'
  })

  User.hasMany(PostComment, {
    foreignKey: 'user_id',
    as: 'comments'
  })

  User.hasMany(PostCommentReply, {
    foreignKey: 'user_id',
    as: 'comment_replies'
  })

  User.hasMany(PostReaction, {
    foreignKey: 'user_id',
    as: 'reactions'
  })
}

// Profile Relationships
const profileRelationships = () => {
  Profile.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'user_id',
    onDelete: 'CASCADE'
  })
}

// Interest Relationships
const interestRelationships = () => {
  Interest.belongsToMany(User, {
    through: 'UserInterests',
    foreignKey: 'interest_id',
    onDelete: 'CASCADE'
  })
}
// FanPage Relationships
const fanpageRelationships = () => {
  Fanpage.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
  });
}

// Notification Relationships
const notificationRelationships = () => {
  Notification.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
  })
}


// Story Relationships
const storyRelationships = () => {
  Story.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
  })
}


const groupMessageRelationships = () => {
  GroupMessage.hasMany(Message, { foreignKey: 'group_message_id', onDelete: 'cascade' })
  GroupMessage.hasMany(MemberGroup, { foreignKey: 'group_message_id', onDelete: 'cascade' })
  GroupMessage.hasMany(NotifyGroupMessage, { foreignKey: 'group_message_id', onDelete: 'cascade' })
  GroupMessage.hasMany(DeleteGroupMessage, { foreignKey: 'group_message_id', onDelete: 'cascade' })
  GroupMessage.belongsTo(User, { foreignKey: 'createdBy', as: 'Creator' })
}

const memberGroup = () => {
  MemberGroup.belongsTo(User, { foreignKey: 'user_id' })
  MemberGroup.belongsTo(GroupMessage, { foreignKey: 'group_message_id' })
}

const notifyGroupMessage = () => {
  NotifyGroupMessage.belongsTo(GroupMessage, { foreignKey: 'group_message_id' })
}

const deleteGroupMessage = () => {
  DeleteGroupMessage.belongsTo(GroupMessage, { foreignKey: 'group_message_id' })
}

const messageRelationships = () => {
  Message.hasMany(ReactMessage, { foreignKey: 'message_id', onDelete: 'cascade' })
  Message.hasMany(SeenMessage, { foreignKey: 'message_id', onDelete: 'cascade' })
  Message.hasMany(RecallMessage, { foreignKey: 'message_id', onDelete: 'cascade' })
  Message.hasMany(ReportMessage, { foreignKey: 'message_id', onDelete: 'cascade' })
}

const seenMessage = () => {
  SeenMessage.belongsTo(Message, { foreignKey: 'message_id' })
}

const reactMessage = () => {
  ReactMessage.belongsTo(Message, { foreignKey: 'message_id' })
}

const recallMessage = () => {
  RecallMessage.belongsTo(Message, { foreignKey: 'message_id' })
}

const reportMessage = () => {
  ReportMessage.belongsTo(Message, { foreignKey: 'message_id' })
}
const searchHistoryRelationships = () => {
  SearchHistory.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  })

  SearchHistory.belongsTo(User, {
    foreignKey: 'target_id',
    onDelete: 'CASCADE'
  })

  // SearchHistory.belongsTo(Fanpage, {
  //   foreignKey: 'target_id',
  //   targetKey: 'fanpage_id',
  //   onDelete: 'CASCADE'
  // })
}

const postRelationships = () => {
  Post.hasMany(PostMediaResource, {
    foreignKey: 'post_id',
    as: 'media_resources'
  })

  Post.hasMany(PostComment, {
    foreignKey: 'post_id',
    as: 'comments'
  })

  Post.hasMany(PostReaction, {
    foreignKey: 'post_id',
    as: 'reactions'
  })

  Post.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'author'
  })
}

const postMediaResourceRelationships = () => {
  PostMediaResource.belongsTo(Post, {
    foreignKey: 'post_id',
    as: 'post',
    onDelete: 'CASCADE'
  })
}

const postCommentRelationships = () => {
  PostComment.belongsTo(Post, {
    foreignKey: 'post_id',
    as: 'post',
    onDelete: 'CASCADE'
  })

  PostComment.hasMany(PostCommentReply, {
    foreignKey: 'comment_id',
    as: 'comment_replies'
  })

  PostComment.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user_comment',
    onDelete: 'CASCADE'
  })
}

const postCommentReplyRelationships = () => {
  PostCommentReply.belongsTo(PostComment, {
    foreignKey: 'comment_id',
    as: 'comment',
    onDelete: 'CASCADE'
  })

  PostCommentReply.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user_reply',
    onDelete: 'CASCADE'
  })

  PostCommentReply.belongsTo(User, {
    foreignKey: 'replied_to_user_id',
    as: 'replied_to_user',
    onDelete: 'CASCADE'
  })
}

const postReactionRelationships = () => {
  PostReaction.belongsTo(Post, {
    foreignKey: 'post_id',
    as: 'post',
    onDelete: 'CASCADE'
  })

  PostReaction.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user_reaction',
    onDelete: 'CASCADE'
  })
}


export const setupModelRelationships = () => {
  roleRelationships()
  accountRelationship()
  userRelationships()
  profileRelationships()
  interestRelationships()
  videoRelationships()
  commentVideoRelationships()
  favoriteVideosRelationships()
  videoReportRelationships()
  hashTagsVideoRelationships()
  messageRelationships()
  groupMessageRelationships()
  memberGroup()
  seenMessage()
  reactMessage()
  recallMessage()
  notifyGroupMessage()
  reportMessage()
  searchHistoryRelationships()
  postRelationships()
  postMediaResourceRelationships()
  postCommentRelationships()
  postCommentReplyRelationships()
  postReactionRelationships()
  permissionRelationships()
  moduleRelationships()
  fanpageRelationships();
  storyRelationships()
}

const models = {
  Role,
  Account,
  User,
  Profile,
  Interest,
  Fanpage,
  Friendship,
  Video,
  CommentVideo,
  LikeVideo,
  FavoriteVideos,
  VideoReport,
  HashTagsVideo,
  GroupMessage,
  MemberGroup,
  Message,
  ReactMessage,
  SeenMessage,
  RecallMessage,
  NotifyGroupMessage,
  DeleteGroupMessage,
  ReportMessage,
  SearchHistory,
  Post,
  PostMediaResource,
  PostComment,
  PostCommentReply,
  PostReaction,
  Permission,
  Module,
  AccountModulePermission,
  RoleModulePermission,
  Story
}

export default models
