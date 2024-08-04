import { DataTypes, Model, Optional } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import db from '../../connection';

export interface NotificationAttributes {
  notification_id: string
  user_id: string
  message: string
  is_read: boolean
  notification_date: Date
  createdAt: Date
  updatedAt: Date
}

type NotificationCreationAttributes = Optional<NotificationAttributes, 'notification_id' | 'createdAt' | 'updatedAt'>;

class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> implements NotificationAttributes {
  declare notification_id: string;
  declare user_id: string
  declare message: string 
  declare is_read: boolean
  declare notification_date: Date
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Notification.init(
  {
    notification_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4(),
    },
    user_id: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: 'Users',
        key: 'user_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    message: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    is_read: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    notification_date: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
    sequelize: db,
    underscored: false,
    modelName: 'Notification',
    tableName: 'Notifications',
    
  }
);

export default Notification;
