import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export interface InterestAttributes {
  interest_id: string
  interest_name: string
  createdAt: Date
  updatedAt: Date
}

interface InterestCreationAttribute extends Optional<InterestAttributes, 'interest_id' | 'createdAt' | 'updatedAt'> {}

class Interest extends Model<InterestAttributes, InterestCreationAttribute> implements InterestAttributes {
  declare interest_id: string
  declare interest_name: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Interest.init(
  {
    interest_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    interest_name: {
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
    timestamps: true,
    sequelize: db,
    underscored: false,
    modelName: 'Interest',
    tableName: 'Interests'
  }
)

export default Interest
