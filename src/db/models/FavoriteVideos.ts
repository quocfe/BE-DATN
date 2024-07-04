import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'
import models from '.'

export interface LikeVideoAttributes {
  id: string
  user_id: string
  video_id: string
  createdAt: Date
  updatedAt: Date
}

interface VideoCreationAttribute
  extends Optional<LikeVideoAttributes, 'id' | 'user_id' | 'video_id' | 'createdAt' | 'updatedAt'> {}

class FavoriteVideos extends Model<LikeVideoAttributes, VideoCreationAttribute> implements LikeVideoAttributes {
  [x: string]: any
  declare id: string
  declare user_id: string
  declare video_id: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

FavoriteVideos.init(
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
    tableName: 'favorite-videos', // Tên bảng trong cơ sở dữ liệu
    modelName: 'favoriteVideos', // Tên mô hình
    timestamps: true // Tự động thêm createdAt và updatedAt
  }
)

export const favoriteVideosRelationships = () => {
  FavoriteVideos.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })

  FavoriteVideos.belongsTo(models.Video, { foreignKey: 'video_id', as: 'video' })
}

export default FavoriteVideos
