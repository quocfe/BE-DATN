// File: src/db/models/FanpageMember.ts

import db from '../../connection';
import { DataTypes, Model } from 'sequelize';

class FanpageMember extends Model {
  public readonly id!: number;
  public fanpage_id!: string;
  public user_id!: string;
  public is_invited!: boolean;
  public is_following!: boolean;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

FanpageMember.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    fanpage_id: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    is_invited: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_following: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    sequelize: db,
    modelName: 'FanpageMember',
    tableName: 'FanpageMembers',
    timestamps: true,
    underscored: false,
  }
);



export default FanpageMember;
