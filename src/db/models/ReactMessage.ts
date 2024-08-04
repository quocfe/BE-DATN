import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export type ReactMessageAttributes = {
  react_message_id: string
  user_id: string
  emoji: string
  message_id: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

interface ReactMessageCreationAttribute
  extends Optional<
    ReactMessageAttributes,
    'react_message_id' | 'user_id' | 'emoji' | 'message_id' | 'createdBy' | 'createdAt' | 'updatedAt'
  > {}

class ReactMessage
  extends Model<ReactMessageAttributes, ReactMessageCreationAttribute>
  implements ReactMessageAttributes
{
  declare react_message_id: string
  declare user_id: string
  declare emoji: string
  declare message_id: string
  declare createdBy: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

ReactMessage.init(
  {
    react_message_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    user_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    emoji: {
      allowNull: false,
      type: DataTypes.STRING
    },
    message_id: {
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
    modelName: 'ReactMessage',
    tableName: 'ReactMessages'
  }
)

export default ReactMessage
