import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'
import models from '.'

export interface CommentVideosAttributes {
  id: string
  video_id: string
  user_id: string
  mentioned_user_id: string
  parent_id: string | null
  content: string
  createdAt: Date
  updatedAt: Date
}

interface CommentVideosCreationAttribute
  extends Optional<
    CommentVideosAttributes,
    'id' | 'user_id' | 'video_id' | 'mentioned_user_id' | 'parent_id' | 'content' | 'createdAt' | 'updatedAt'
  > {}

class CommentVideo
  extends Model<CommentVideosAttributes, CommentVideosCreationAttribute>
  implements CommentVideosAttributes
{
  declare id: string
  declare video_id: string
  declare user_id: string
  declare mentioned_user_id: string
  declare parent_id: string | null
  declare content: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

CommentVideo.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    video_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mentioned_user_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    parent_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true
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
    sequelize: db, // Kết nối Sequelize instance
    tableName: 'comment-videos', // Tên bảng trong cơ sở dữ liệu
    modelName: 'commentVidoes', // Tên mô hình
    timestamps: true // Tự động thêm createdAt và updatedAt
  }
)

export const commentVideoRelationships = () => {
  CommentVideo.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' }),
    // Mối quan hệ: một CommentVideo có thể có một parent CommentVideo (self-referencing)
    CommentVideo.belongsTo(CommentVideo, { foreignKey: 'parent_id', as: 'parent' })

  // Mối quan hệ: một CommentVideo có thể có nhiều CommentVideo con (hasMany)
  CommentVideo.hasMany(CommentVideo, { foreignKey: 'parent_id', as: 'children' })

  CommentVideo.hasMany(models.LikeVideo, { foreignKey: 'comment_id', as: 'likes', onDelete: 'CASCADE' })
}

export default CommentVideo
