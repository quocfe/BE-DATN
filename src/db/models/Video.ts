import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'
import PRIVACY from '../../constants/video'
import User from './User'
import LikeVideo from './LikeVideo'
import CommentVideo from './CommentVideo'

export interface VideoAttributes {
  [x: string]: any
  id: string
  content: string
  contentText: string
  url: string
  public_id: string
  tag: string
  privacy: string
  view: number
  category_video_id: string
  user_id: string
  duration: number
  // list_like_user_id: Array<string>
  createdAt: Date
  updatedAt: Date
}

interface VideoCreationAttribute
  extends Optional<
    VideoAttributes,
    | 'id'
    | 'content'
    | 'url'
    | 'public_id'
    | 'contentText'
    | 'tag'
    | 'privacy'
    | 'view'
    | 'category_video_id'
    | 'user_id'
    | 'duration'
    | 'createdAt'
    | 'updatedAt'
  > {}

class Video extends Model<VideoAttributes, VideoCreationAttribute> implements VideoAttributes {
  declare id: string
  declare content: string
  declare contentText: string
  declare url: string
  declare public_id: string
  declare tag: string
  declare privacy: string
  declare view: number
  declare category_video_id: string
  declare user_id: string
  declare duration: number
  declare list_like_user_id: Array<string>
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Video.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    content: {
      allowNull: true,
      type: DataTypes.STRING
    },
    contentText: {
      allowNull: true,
      type: DataTypes.STRING
    },
    url: {
      allowNull: false,
      type: DataTypes.STRING
    },
    public_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    tag: {
      allowNull: true,
      type: DataTypes.STRING
    },
    privacy: {
      allowNull: false,
      type: DataTypes.ENUM(PRIVACY.ALL, PRIVACY.FRIEND, PRIVACY.ONLY),
      defaultValue: PRIVACY.ALL
    },
    view: {
      allowNull: false,
      type: DataTypes.NUMBER,
      defaultValue: 0
    },
    duration: {
      allowNull: false,
      type: DataTypes.NUMBER,
      defaultValue: 0
    },
    category_video_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    user_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    // list_like_user_id: {
    //   allowNull: true,
    //   type: DataTypes.ARRAY(DataTypes.STRING)
    // },
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
    tableName: 'videos', // Tên bảng trong cơ sở dữ liệu
    modelName: 'videos', // Tên mô hình
    timestamps: true // Tự động thêm createdAt và updatedAt
  }
)

export const videoRelationships = () => {
  Video.belongsTo(User, { foreignKey: 'user_id', as: 'user' }),
    Video.hasMany(LikeVideo, { foreignKey: 'video_id', as: 'likes' })
  Video.hasMany(LikeVideo, { foreignKey: 'video_id', as: 'isLikes' })
  Video.hasMany(CommentVideo, { foreignKey: 'video_id', as: 'comments' })
}

export default Video
