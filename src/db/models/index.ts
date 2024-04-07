import User from './User'
import Role from './Role'

// Role Relationships
const roleRelationships = () => {
  Role.hasMany(User, {
    foreignKey: 'role_id',
    as: 'user_data'
  })
}

// User Relationships
const userRelationships = () => {
  User.belongsTo(Role, {
    targetKey: 'role_id',
    foreignKey: 'role_id',
    as: 'role_data'
  })
}

export const setupModelRelationships = () => {
  roleRelationships()
  userRelationships()
}

const models = { Role, User }

export default models
