import db from '../../connection'
import { DataTypes, Model, Optional } from 'sequelize'

export interface AccountModulePermissionAttributes {
  id: number
  account_id: string
  module_id: string
  permission_id: string
  createdAt: Date
  updatedAt: Date
}

interface AccountModulePermissionCreationAttribute
  extends Optional<AccountModulePermissionAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class AccountModulePermission
  extends Model<AccountModulePermissionAttributes, AccountModulePermissionCreationAttribute>
  implements AccountModulePermissionAttributes
{
  declare id: number
  declare account_id: string
  declare module_id: string
  declare permission_id: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

AccountModulePermission.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    account_id: {
      allowNull: true,
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
    modelName: 'AccountModulePermission',
    tableName: 'AccountModulePermissions'
  }
)

export default AccountModulePermission
