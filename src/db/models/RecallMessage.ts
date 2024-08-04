import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export type RecallMessageAttributes = {
  recall_message_id: string
  message_id: string
  user_id: string
  createdAt: Date
  updatedAt: Date
}

interface MessageCreationAttribute
  extends Optional<
    RecallMessageAttributes,
    'recall_message_id' | 'message_id' | 'user_id' | 'createdAt' | 'updatedAt'
  > {}

class RecallMessage
  extends Model<RecallMessageAttributes, MessageCreationAttribute>
  implements RecallMessageAttributes
{
  declare recall_message_id: string
  declare message_id: string
  declare user_id: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

RecallMessage.init(
  {
    recall_message_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    message_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    user_id: {
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
    modelName: 'RecallMessage',
    tableName: 'RecallMessages'
  }
)

export default RecallMessage
