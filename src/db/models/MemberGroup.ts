import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export type MemberGroupAttributes = {
  member_group_id: string
  user_id: string
  group_message_id: string
  role: boolean
  status: boolean
  createdAt: Date
  updatedAt: Date
}

interface MemberGroupCreationAttribute
  extends Optional<
    MemberGroupAttributes,
    'member_group_id' | 'user_id' | 'group_message_id' | 'role' | 'status' | 'createdAt' | 'updatedAt'
  > {}

class MemberGroup extends Model<MemberGroupAttributes, MemberGroupCreationAttribute> implements MemberGroupAttributes {
  declare member_group_id: string
  declare user_id: string
  declare group_message_id: string
  declare role: boolean
  declare status: boolean
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

MemberGroup.init(
  {
    member_group_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    user_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    group_message_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    role: {
      allowNull: true,
      type: DataTypes.BOOLEAN
    },
    status: {
      allowNull: true,
      type: DataTypes.BOOLEAN
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
    modelName: 'MemberGroup',
    tableName: 'MemberGroups'
  }
)

export default MemberGroup
