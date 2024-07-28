import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'
import PRIVACY from '../../constants/video'
import User from './User'
import LikeVideo from './LikeVideo'
import CommentVideo from './CommentVideo'

export interface HashTagsVideoAttributes {
  id: string
  tag: string
  createdAt: Date
  updatedAt: Date
}

interface HashTagsVideoCreationAttribute
  extends Optional<HashTagsVideoAttributes, 'id' | 'tag' | 'createdAt' | 'updatedAt'> {}

class HashTagsVideo
  extends Model<HashTagsVideoAttributes, HashTagsVideoCreationAttribute>
  implements HashTagsVideoAttributes
{
  declare id: string
  declare tag: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

HashTagsVideo.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    tag: {
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
    tableName: 'hash-tag-video', // Tên bảng trong cơ sở dữ liệu
    modelName: 'hashTagsVideo', // Tên mô hình
    timestamps: true // Tự động thêm createdAt và updatedAt
  }
)

export const hashTagsVideoRelationships = () => {}

export default HashTagsVideo
