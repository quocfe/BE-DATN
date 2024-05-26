import User from './User'
import Profile from './Profile'
import Interest from './Interest'
import Friendship from './Friendship'

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
  userRelationships()
  profileRelationships()
  interestRelationships()
}

const models = { User, Profile, Interest, Friendship }

export default models
