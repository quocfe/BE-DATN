import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export interface RoletAttributes {
  role_id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
}

interface RoleCreationAttribute extends Optional<RoletAttributes, 'role_id' | 'createdAt' | 'updatedAt'> {}

class Role extends Model<RoletAttributes, RoleCreationAttribute> implements RoletAttributes {
  declare role_id: string
  declare name: string
  declare description: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Role.init(
  {
    role_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    description: {
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
    modelName: 'Role',
    tableName: 'Roles'
  }
)

export default Role
