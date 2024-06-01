import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export type MessageAttributes = {
  message_id: string
  body: string
  sub_body: string
  status: boolean
  group_message_id: string
  parent_id: string
  detelectedBy: string
  detelectedAt: Date
  createdBy: string
  type: number
  createdAt: Date
  updatedAt: Date
}

interface MessageCreationAttribute
  extends Optional<
    MessageAttributes,
    | 'message_id'
    | 'body'
    | 'sub_body'
    | 'group_message_id'
    | 'parent_id'
    | 'status'
    | 'createdBy'
    | 'detelectedBy'
    | 'detelectedAt'
    | 'type'
    | 'createdAt'
    | 'updatedAt'
  > {}

class Message extends Model<MessageAttributes, MessageCreationAttribute> implements MessageAttributes {
  declare message_id: string
  declare body: string
  declare sub_body: string
  declare status: boolean
  declare group_message_id: string
  declare parent_id: string
  declare detelectedBy: string
  declare readonly detelectedAt: Date
  declare createdBy: string
  declare type: number
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Message.init(
  {
    message_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    body: {
      allowNull: false,
      type: DataTypes.STRING
    },
    sub_body: {
      allowNull: true,
      type: DataTypes.STRING
    },
    status: {
      allowNull: true,
      type: DataTypes.BOOLEAN
    },
    group_message_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    parent_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    detelectedAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    detelectedBy: {
      allowNull: true,
      type: DataTypes.STRING
    },
    createdBy: {
      allowNull: false,
      type: DataTypes.STRING
    },
    type: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1
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
    modelName: 'Message',
    tableName: 'Messages'
  }
)

export default Message
