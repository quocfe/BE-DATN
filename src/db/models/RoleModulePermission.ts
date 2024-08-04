import db from '../../connection'
import { DataTypes, Model, Optional } from 'sequelize'

export interface RoleModulePermissionAttributes {
  id: number
  role_id: string
  module_id: string
  permission_id: string
  createdAt: Date
  updatedAt: Date
}

interface RoleModuleCreationAttribute
  extends Optional<RoleModulePermissionAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class RoleModulePermission
  extends Model<RoleModulePermissionAttributes, RoleModuleCreationAttribute>
  implements RoleModulePermissionAttributes
{
  declare id: number
  declare role_id: string
  declare module_id: string
  declare permission_id: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

RoleModulePermission.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    role_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    module_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    permission_id: {
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
    modelName: 'RoleModulePermission',
    tableName: 'RoleModulePermissions'
  }
)

export default RoleModulePermission
