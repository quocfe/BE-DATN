import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export interface PermissionAttributes {
  permission_id: string
  name: string
  display_name: string
  createdAt: Date
  updatedAt: Date
}

interface PermissionCreationAttribute
  extends Optional<PermissionAttributes, 'permission_id' | 'createdAt' | 'updatedAt'> {}

class Permission extends Model<PermissionAttributes, PermissionCreationAttribute> implements PermissionAttributes {
  declare permission_id: string
  declare name: string
  declare display_name: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Permission.init(
  {
    permission_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    display_name: {
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
    modelName: 'Permission',
    tableName: 'Permissions'
  }
)

export default Permission
