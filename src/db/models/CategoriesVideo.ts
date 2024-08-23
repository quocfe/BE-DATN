import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export interface CategoryVideosAttributes {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

interface CategoryVideosCreationAttribute
  extends Optional<CategoryVideosAttributes, 'id' | 'name' | 'createdAt' | 'updatedAt'> {}

class CategoryVideoModel
  extends Model<CategoryVideosAttributes, CategoryVideosCreationAttribute>
  implements CategoryVideosAttributes
{
  declare id: string
  declare name: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

CategoryVideoModel.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
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
    tableName: 'categories_videos', // Tên bảng trong cơ sở dữ liệu
    modelName: 'categoryVideos', // Tên mô hình
    timestamps: true // Tự động thêm createdAt và updatedAt
  }
)

export default CategoryVideoModel
