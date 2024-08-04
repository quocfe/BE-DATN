import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export interface SearchHistorytAttributes {
  search_history_id: string
  user_id: string
  target_id: string
  search_type: string
  createdAt: Date
  updatedAt: Date
}

interface SearchHistoryCreationAttribute
  extends Optional<SearchHistorytAttributes, 'search_history_id' | 'createdAt' | 'updatedAt'> {}

class SearchHistory
  extends Model<SearchHistorytAttributes, SearchHistoryCreationAttribute>
  implements SearchHistorytAttributes
{
  declare search_history_id: string
  declare user_id: string
  declare target_id: string
  declare search_type: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

SearchHistory.init(
  {
    search_history_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    user_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    target_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    search_type: {
      allowNull: true,
      type: DataTypes.ENUM('user', 'fanpage')
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
    modelName: 'SearchHistory',
    tableName: 'SearchHistories'
  }
)

export default SearchHistory
