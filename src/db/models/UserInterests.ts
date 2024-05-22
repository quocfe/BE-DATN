import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export interface UserInterestsAttributes {
  id: number
  user_id: string
  interest_id: string
  createdAt: Date
  updatedAt: Date
}

class UserInterests extends Model<UserInterestsAttributes> implements UserInterestsAttributes {
  declare id: number
  declare user_id: string
  declare interest_id: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

UserInterests.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    user_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    interest_id: {
      allowNull: true,
      type: DataTypes.STRING
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
    modelName: 'UserInterests',
    tableName: 'UserInterests'
  }
)

export default UserInterests
