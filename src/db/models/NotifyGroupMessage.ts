import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export type NotifyGroupMessageAttributes = {
  notify_group_message_id: string
  group_message_id: string
  content: string
  receiver_id: string
  status: boolean
  type: number
  createdAt: Date
  updatedAt: Date
}

interface MessageCreationAttribute
  extends Optional<
    NotifyGroupMessageAttributes,
    | 'notify_group_message_id'
    | 'group_message_id'
    | 'content'
    | 'receiver_id'
    | 'status'
    | 'type'
    | 'createdAt'
    | 'updatedAt'
  > {}

class NotifyGroupMessage
  extends Model<NotifyGroupMessageAttributes, MessageCreationAttribute>
  implements NotifyGroupMessageAttributes
{
  declare notify_group_message_id: string
  declare content: string
  declare group_message_id: string
  declare receiver_id: string
  declare status: boolean
  declare type: number
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

NotifyGroupMessage.init(
  {
    notify_group_message_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },

    group_message_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING
    },
    receiver_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    status: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    type: {
      allowNull: false,
      type: DataTypes.NUMBER
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
    modelName: 'NotifyGroupMessage',
    tableName: 'NotifyGroupMessages'
  }
)

export default NotifyGroupMessage
