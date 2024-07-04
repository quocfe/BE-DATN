import User from './User'
import Profile from './Profile'
import Interest from './Interest'
import Video, { videoRelationships } from './Video'
import CommentVideo, { commentVideoRelationships } from './CommentVideo'
import Friendship from './Friendship'
import LikeVideo from './LikeVideo'
import Role from './Role'
import Account from './Account'
import FavoriteVideos, { favoriteVideosRelationships } from './FavoriteVideos'

const roleRelationships = () => {
  Role.hasMany(Account, {
    foreignKey: 'role_id'
  })
}

const accountRelationship = () => {
  Account.belongsTo(Role, {
    foreignKey: 'role_id'
  })
}

const userRelationships = () => {
  User.hasOne(Profile, {
    foreignKey: 'user_id'
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

export const setupModelRelationships = () => {
  roleRelationships()
  accountRelationship()
  userRelationships()
  profileRelationships()
  interestRelationships()
  videoRelationships()
  commentVideoRelationships()
  favoriteVideosRelationships()
}

const models = { Role, Account, User, Profile, Interest, Friendship, Video, CommentVideo, LikeVideo, FavoriteVideos }

export default models
