import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export interface PostCommentAttributes {
  comment_id: string
  content: string
  media_url: string
  post_id: string
  user_id: string
  createdAt: Date
  updatedAt: Date
}

interface PostCommentCreationAttribute
  extends Optional<PostCommentAttributes, 'comment_id' | 'createdAt' | 'updatedAt'> {}

class PostComment extends Model<PostCommentAttributes, PostCommentCreationAttribute> implements PostCommentAttributes {
  declare comment_id: string
  declare content: string
  declare media_url: string
  declare post_id: string
  declare user_id: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

PostComment.init(
  {
    comment_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    content: {
      allowNull: true,
      type: DataTypes.STRING
    },
    media_url: {
      allowNull: true,
      type: DataTypes.STRING
    },
    post_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    user_id: {
      allowNull: false,
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
    modelName: 'PostComment',
    tableName: 'PostComments'
  }
)

export default PostComment
