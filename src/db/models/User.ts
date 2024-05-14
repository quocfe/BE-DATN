import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export interface UserAttributes {
  user_id: string
  first_name: string
  last_name: string
  email: string
  password: string
  code: string
  is_auth: boolean
  expires: string
  createdAt: Date
  updatedAt: Date
}

interface UserCreationAttribute
  extends Optional<UserAttributes, 'user_id' | 'code' | 'is_auth' | 'expires' | 'createdAt' | 'updatedAt'> {}

class User extends Model<UserAttributes, UserCreationAttribute> implements UserAttributes {
  declare user_id: string
  declare first_name: string
  declare last_name: string
  declare email: string
  declare password: string
  declare code: string
  declare is_auth: boolean
  declare expires: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

User.init(
  {
    user_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    first_name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    last_name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING
    },
    password: {
      allowNull: true,
      type: DataTypes.STRING
    },
    code: {
      allowNull: true,
      type: DataTypes.STRING
    },
    is_auth: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    expires: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: ''
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  },
  {
    timestamps: true,
    sequelize: db,
    underscored: false,
    modelName: 'User',
    tableName: 'Users'
  }
)

export default User
