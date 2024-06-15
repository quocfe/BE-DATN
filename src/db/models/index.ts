import User from './User'
import Profile from './Profile'
import Interest from './Interest'
import Friendship from './Friendship'
import GroupMessage from './GroupMessage'
import MemberGroup from './MemberGroup'
import ReactMessage from './ReactMessage'
import SeenMessage from './SeenMessage'
import Message from './Message'
import Role from './Role'
import Account from './Account'
import RecallMessage from './RecallMessage'
import NotifyGroupMessage from './NotifyGroupMessage'

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

const groupMessageRelationships = () => {
  GroupMessage.hasMany(Message, { foreignKey: 'group_message_id', onDelete: 'cascade' })
  GroupMessage.hasMany(MemberGroup, { foreignKey: 'group_message_id', onDelete: 'cascade' })
  GroupMessage.hasMany(NotifyGroupMessage, { foreignKey: 'group_message_id', onDelete: 'cascade' })
  GroupMessage.belongsTo(User, { foreignKey: 'createdBy' })
}

const memberGroup = () => {
  MemberGroup.belongsTo(User, { foreignKey: 'user_id' })
  MemberGroup.belongsTo(GroupMessage, { foreignKey: 'group_message_id' })
}

const notifyGroupMessage = () => {
  NotifyGroupMessage.belongsTo(GroupMessage, { foreignKey: 'group_message_id' })
}

const messageRelationships = () => {
  Message.hasMany(ReactMessage, { foreignKey: 'message_id', onDelete: 'cascade' })
  Message.hasMany(SeenMessage, { foreignKey: 'message_id', onDelete: 'cascade' })
  Message.hasMany(RecallMessage, { foreignKey: 'message_id', onDelete: 'cascade' })
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

export const setupModelRelationships = () => {
  roleRelationships()
  accountRelationship()
  userRelationships()
  profileRelationships()
  interestRelationships()
  messageRelationships()
  groupMessageRelationships()
  memberGroup()
  seenMessage()
  reactMessage()
  recallMessage()
  notifyGroupMessage()
}

const models = {
  User,
  Profile,
  Interest,
  Friendship,
  GroupMessage,
  MemberGroup,
  Message,
  ReactMessage,
  SeenMessage,
  RecallMessage,
  NotifyGroupMessage,
  Role,
  Account
}

export default models
