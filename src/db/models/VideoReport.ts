import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'
import User from './User'
import Video from './Video'

export interface VideoReportAttributes {
  id: string
  video_id: string
  user_id: string
  reason: string
  createdAt: Date
  updatedAt: Date
}

interface VideoReportCreationAttribute
  extends Optional<VideoReportAttributes, 'id' | 'video_id' | 'user_id' | 'reason' | 'createdAt' | 'updatedAt'> {}

class VideoReport extends Model<VideoReportAttributes, VideoReportCreationAttribute> implements VideoReportAttributes {
  declare id: string
  declare video_id: string
  declare user_id: string
  declare reason: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

VideoReport.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    user_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    video_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    reason: {
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
    sequelize: db, // Kết nối Sequelize instance
    tableName: 'video-report', // Tên bảng trong cơ sở dữ liệu
    modelName: 'video-report', // Tên mô hình
    timestamps: true // Tự động thêm createdAt và updatedAt
  }
)

export const videoReportRelationships = () => {
  VideoReport.belongsTo(User, { foreignKey: 'user_id', as: 'user' })
  VideoReport.belongsTo(Video, { foreignKey: 'video_id', as: 'video' })
}

export default VideoReport
