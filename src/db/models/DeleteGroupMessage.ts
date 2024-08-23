import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export type DeleteGroupMessageAttributes = {
  delete_group_message_id: string
  group_message_id: string
  deletedBy: string
  deletedAt: Date
  status: boolean
  createdAt: Date
  updatedAt: Date
}

interface MessageCreationAttribute
  extends Optional<
    DeleteGroupMessageAttributes,
    'delete_group_message_id' | 'group_message_id' | 'deletedBy' | 'deletedAt' | 'status' | 'createdAt' | 'updatedAt'
  > {}

class DeleteGroupMessage
  extends Model<DeleteGroupMessageAttributes, MessageCreationAttribute>
  implements DeleteGroupMessageAttributes
{
  declare delete_group_message_id: string
  declare group_message_id: string
  declare deletedBy: string
  declare deletedAt: Date
  declare status: boolean
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

DeleteGroupMessage.init(
  {
    delete_group_message_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },

    group_message_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    deletedBy: {
      allowNull: false,
      type: DataTypes.STRING
    },
    deletedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    status: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true
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
    modelName: 'DeleteGroupMessage',
    tableName: 'DeleteGroupMessages'
  }
)

export default DeleteGroupMessage
