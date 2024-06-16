import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export interface FriendshipAttributes {
  friendship_id: string
  user_id: string
  friend_id: string
  status: string
  createdAt: Date
  updatedAt: Date
}

interface FriendshipCreationAttribute
  extends Optional<FriendshipAttributes, 'friendship_id' | 'status' | 'createdAt' | 'updatedAt'> {}

class Friendship extends Model<FriendshipAttributes, FriendshipCreationAttribute> implements FriendshipAttributes {
  declare friendship_id: string
  declare user_id: string
  declare friend_id: string
  declare status: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Friendship.init(
  {
    friendship_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    user_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    friend_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    status: {
      allowNull: true,
      type: DataTypes.ENUM('Chờ chấp nhận', 'Đã chấp nhận', 'Đã chặn'),
      defaultValue: 'Chờ chấp nhận'
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
    modelName: 'Friendship',
    tableName: 'Friendships'
  }
)

export default Friendship
