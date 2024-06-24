import User from './User'
import Profile from './Profile'
import Interest from './Interest'
import Friendship from './Friendship'
import Role from './Role'
import Account from './Account'
import SearchHistory from './SearchHistory'

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

  User.hasMany(SearchHistory, {
    foreignKey: 'user_id'
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
    targetKey: 'user_id',
    onDelete: 'CASCADE'
  })

  // SearchHistory.belongsTo(Fanpage, {
  //   foreignKey: 'target_id',
  //   targetKey: 'fanpage_id',
  //   onDelete: 'CASCADE'
  // })
}

export const setupModelRelationships = () => {
  roleRelationships()
  accountRelationship()
  userRelationships()
  profileRelationships()
  interestRelationships()
  searchHistoryRelationships()
}

const models = { Role, Account, User, Profile, Interest, Friendship, SearchHistory }

export default models
