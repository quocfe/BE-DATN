import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export type SeenMessageAttributes = {
  seen_message_id: string
  user_id: string
  message_id: string
  group_message_id: string
  status: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

interface SeenMessageCreationAttribute
  extends Optional<
    SeenMessageAttributes,
    | 'seen_message_id'
    | 'user_id'
    | 'message_id'
    | 'group_message_id'
    | 'status'
    | 'createdBy'
    | 'createdAt'
    | 'updatedAt'
  > {}

class SeenMessage extends Model<SeenMessageAttributes, SeenMessageCreationAttribute> implements SeenMessageAttributes {
  declare seen_message_id: string
  declare user_id: string
  declare message_id: string
  declare group_message_id: string
  declare status: string
  declare createdBy: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

SeenMessage.init(
  {
    seen_message_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    user_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    message_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    group_message_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdBy: {
      allowNull: false,
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
    modelName: 'SeenMessage',
    tableName: 'SeenMessages'
  }
)

export default SeenMessage
