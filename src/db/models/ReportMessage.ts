import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export type ReportMessageAttributes = {
  report_message_id: string
  message_id: string
  user_id: string
  reason: string
  createdAt: Date
  updatedAt: Date
}

interface ReportMessageCreationAttribute
  extends Optional<
    ReportMessageAttributes,
    'report_message_id' | 'message_id' | 'user_id' | 'reason' | 'createdAt' | 'updatedAt'
  > {}

class ReportMessage
  extends Model<ReportMessageAttributes, ReportMessageCreationAttribute>
  implements ReportMessageAttributes
{
  declare report_message_id: string
  declare message_id: string
  declare user_id: string
  declare reason: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

ReportMessage.init(
  {
    report_message_id: {
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
    reason: {
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
    modelName: 'ReportMessage',
    tableName: 'ReportMessages'
  }
)

export default ReportMessage
