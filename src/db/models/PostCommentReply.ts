import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export interface PostCommentReplyAttributes {
  comment_reply_id: string
  content: string
  media_url: string
  comment_id: string
  user_id: string
  replied_to_user_id: string
  createdAt: Date
  updatedAt: Date
}

interface PostCommentReplyCreationAttribute
  extends Optional<PostCommentReplyAttributes, 'comment_reply_id' | 'createdAt' | 'updatedAt'> {}

class PostCommentReply
  extends Model<PostCommentReplyAttributes, PostCommentReplyCreationAttribute>
  implements PostCommentReplyAttributes
{
  declare comment_reply_id: string
  declare content: string
  declare media_url: string
  declare comment_id: string
  declare user_id: string
  declare replied_to_user_id: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

PostCommentReply.init(
  {
    comment_reply_id: {
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
    comment_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    user_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    replied_to_user_id: {
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
    modelName: 'PostCommentReply',
    tableName: 'PostCommentReplies'
  }
)

export default PostCommentReply
