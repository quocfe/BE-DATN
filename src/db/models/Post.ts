import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export interface PostAttributes {
  post_id: string
  content: string
  privary: string
  location: string
  post_type: string
  user_id: string
  fanpage_id: string
  createdAt: Date
  updatedAt: Date
}

interface InterestCreationAttribute
  extends Optional<PostAttributes, 'post_id' | 'user_id' | 'fanpage_id' | 'createdAt' | 'updatedAt'> {}

class Post extends Model<PostAttributes, InterestCreationAttribute> implements PostAttributes {
  declare post_id: string
  declare content: string
  declare privary: 'public' | 'friends' | 'private'
  declare location: string
  declare post_type: 'image' | 'video'
  declare user_id: string
  declare fanpage_id: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Post.init(
  {
    post_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    content: {
      allowNull: true,
      type: DataTypes.STRING
    },
    privary: {
      allowNull: true,
      type: DataTypes.ENUM('public', 'friends', 'private')
    },
    location: {
      allowNull: true,
      type: DataTypes.STRING
    },
    post_type: {
      allowNull: true,
      type: DataTypes.ENUM('image', 'video')
    },
    user_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    fanpage_id: {
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
    modelName: 'Post',
    tableName: 'Posts'
  }
)

export default Post
