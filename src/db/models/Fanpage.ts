
import db from '../../connection';
import { v4 as uuidv4 } from 'uuid';
import { DataTypes, Model, Optional } from 'sequelize';

export interface FanpageAttributes {
  fanpage_id: string;
  group_name: string;
  description: string;
  followers_count: number;
  likes_count: number;
  category: string;
  address: string;
  phone: number;
  is_public: boolean;
  role_id: string;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface FanPageCreationAttributes
  extends Optional<FanpageAttributes, 'fanpage_id' | 'createdAt' | 'updatedAt'> {}

class Fanpage extends Model<FanpageAttributes, FanPageCreationAttributes> implements FanpageAttributes {
  declare fanpage_id: string;
  declare group_name: string;
  declare description: string;
  declare followers_count: number;
  declare likes_count: number;
  declare category: string;
  declare address: string;
  declare phone: number;
  declare is_public: boolean;
  declare role_id: string;
  declare user_id: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Fanpage.init(
  {
    fanpage_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    group_name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    description: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    followers_count: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    likes_count: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    category: {
      allowNull: true,
      type: DataTypes.STRING
    },
    address: {
      allowNull: true,
      type: DataTypes.STRING
    },
    phone: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    is_public: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    role_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    user_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    timestamps: true,
    sequelize: db,
    underscored: false,
    modelName: 'Fanpage',
    tableName: 'Fanpages'
  }
);

export default Fanpage;