import User from './User'
import Profile from './Profile'
import Interest from './Interest'
import Friendship from './Friendship'
import Role from './Role'
import Account from './Account'
import SearchHistory from './SearchHistory'
import Post from './Post'
import PostMediaResource from './PostMediaResource'
import PostComment from './PostComment'
import PostCommentReply from './PostCommentReply'
import PostReaction from './PostReaction'

const roleRelationships = () => {
  Role.hasMany(Account, {
    foreignKey: 'role_id'
  })
}

const accountRelationship = () => {
  Account.belongsTo(Role, {
    foreignKey: 'role_id',
    onDelete: 'CASCADE',
    as: 'role'
  })
}

const userRelationships = () => {
  User.hasOne(Profile, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
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

const profileRelationships = () => {
  Profile.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  })
}

const interestRelationships = () => {
  Interest.belongsToMany(User, {
    through: 'UserInterests',
    foreignKey: 'interest_id',
    onDelete: 'CASCADE'
  })
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
  searchHistoryRelationships()
  postRelationships()
  postMediaResourceRelationships()
  postCommentRelationships()
  postCommentReplyRelationships()
  postReactionRelationships()
}

const models = {
  Role,
  Account,
  User,
  Profile,
  Interest,
  Friendship,
  SearchHistory,
  Post,
  PostMediaResource,
  PostComment,
  PostCommentReply,
  PostReaction
}

export default models
