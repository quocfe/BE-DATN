import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export interface ModuleAttributes {
  module_id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

interface ModuleCreationAttribute extends Optional<ModuleAttributes, 'module_id' | 'createdAt' | 'updatedAt'> {}

class Module extends Model<ModuleAttributes, ModuleCreationAttribute> implements ModuleAttributes {
  declare module_id: string
  declare name: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Module.init(
  {
    module_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    name: {
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
    modelName: 'Module',
    tableName: 'Modules'
  }
)

export default Module
