import db from '../../connection';
import { v4 as uuidv4 } from 'uuid';
import { DataTypes, Model, Optional } from 'sequelize';

export interface StoryAttributes {
  story_id: string;
  user_id: string;
  content: string;
  text :string;
  privacy: string;
  tag: string;
  story_view: string;
  story_time: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface StoryCreationAttributes extends Optional<StoryAttributes, 'story_id' | 'createdAt' | 'updatedAt'> {}

class Story extends Model<StoryAttributes, StoryCreationAttributes> implements StoryAttributes {
    declare story_id: string;
    declare user_id: string;
    declare content: string;
    declare text: string;
    declare music: string;
    declare story_view: string;
    declare privacy: string;
    declare tag: string;
    declare readonly story_time: Date
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Story.init(
  {
    story_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    user_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING
    },
    text: {
      allowNull: true,
      type: DataTypes.STRING
    },
    story_view:{
      allowNull: true,
      type: DataTypes.STRING,
    },
    privacy:{
      allowNull: false,
      type: DataTypes.STRING,
    },
    tag:{
      allowNull: false,
      type: DataTypes.STRING,
    },
    story_time:{
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
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
    timestamps: true,
    sequelize: db,
    underscored: false,
    modelName: 'Story',
    tableName: 'Stories'
  }
);

export default Story;
