import db from '../../connection';
import { v4 as uuidv4 } from 'uuid';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ReviewAttributes {
  review_id: string;
  rating: number;
  comment: string ;
  review_date: Date;
  user_id: string;
  product_id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ReviewCreationAttributes
  extends Optional<ReviewAttributes, 'review_id' | 'createdAt' | 'updatedAt'> {}

class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
  declare review_id: string;
  declare rating: number;
  declare comment: string ;
  declare review_date: Date;
  declare user_id: string;
  declare product_id: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Review.init(
  {
    review_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    rating: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    comment: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    review_date: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    user_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    product_id: {
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
    modelName: 'Review',
    tableName: 'Reviews'
  }
);

export default Review;
