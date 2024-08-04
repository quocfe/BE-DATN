import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'
import PRIVACY from '../../constants/video'
import User from './User'
import models from '.'
import LIKE_TYPE from '../../constants/likeVideo'

export interface LikeVideoAttributes {
  [x: string]: any
  id: string
  user_id: string
  video_id: string
  comment_id: string | null
  like_type: string
  createdAt: Date
  updatedAt: Date
}

interface VideoCreationAttribute
  extends Optional<
    LikeVideoAttributes,
    'id' | 'user_id' | 'video_id' | 'comment_id' | 'like_type' | 'createdAt' | 'updatedAt'
  > {}

class LikeVideo extends Model<LikeVideoAttributes, VideoCreationAttribute> implements LikeVideoAttributes {
  [x: string]: any
  declare id: string
  declare user_id: string
  declare video_id: string
  declare comment_id: string | null
  declare like_type: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

LikeVideo.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    user_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    video_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    comment_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    like_type: {
      allowNull: true,
      type: DataTypes.ENUM(...LIKE_TYPE)
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
    tableName: 'like-videos', // Tên bảng trong cơ sở dữ liệu
    modelName: 'likeVideo', // Tên mô hình
    timestamps: true // Tự động thêm createdAt và updatedAt
  }
)

export const likevideoRelationships = () => {
  LikeVideo.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })

  LikeVideo.belongsTo(models.Video, { foreignKey: 'video_id', as: 'video' })

  LikeVideo.belongsTo(models.CommentVideo, { foreignKey: 'comment_id', as: 'comment' })
}

export default LikeVideo
