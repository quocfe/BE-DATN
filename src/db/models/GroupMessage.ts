import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export type GroupMessageAttributes = {
  group_message_id: string
  group_name: string
  status: boolean
  type: number
  group_thumbnail: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

interface GroupMessageCreationAttribute
  extends Optional<
    GroupMessageAttributes,
    'group_message_id' | 'group_name' | 'status' | 'createdBy' | 'type' | 'group_thumbnail' | 'createdAt' | 'updatedAt'
  > {}

class GroupMessage
  extends Model<GroupMessageAttributes, GroupMessageCreationAttribute>
  implements GroupMessageAttributes
{
  declare group_message_id: string
  declare group_name: string
  declare status: boolean
  declare type: number
  declare group_thumbnail: string
  declare createdBy: string
  declare createdAt: Date
  declare updatedAt: Date
}

GroupMessage.init(
  {
    group_message_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    group_name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    status: {
      allowNull: true,
      type: DataTypes.BOOLEAN
    },
    type: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    group_thumbnail: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue:
        'https://static.vecteezy.com/system/resources/previews/009/973/092/large_2x/people-icon-sign-symbol-design-free-png.png'
    },
    createdBy: {
      allowNull: true,
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    timestamps: false,
    sequelize: db,
    underscored: false,
    modelName: 'GroupMessage',
    tableName: 'GroupMessages'
  }
)

export default GroupMessage
