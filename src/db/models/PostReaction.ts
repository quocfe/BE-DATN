import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export interface PostReactionAttributes {
  post_reaction_id: string
  post_id: string
  user_id: string
  type: string
  createdAt: Date
  updatedAt: Date
}

interface PostReactionCreationAttribute
  extends Optional<PostReactionAttributes, 'post_reaction_id' | 'createdAt' | 'updatedAt'> {}

class PostReaction
  extends Model<PostReactionAttributes, PostReactionCreationAttribute>
  implements PostReactionAttributes
{
  declare post_reaction_id: string
  declare post_id: string
  declare user_id: string
  declare type: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

PostReaction.init(
  {
    post_reaction_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    post_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    user_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    type: {
      allowNull: true,
      type: DataTypes.ENUM('like', 'love', 'haha', 'sad', 'wow', 'angry')
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
    modelName: 'PostReaction',
    tableName: 'PostReactions'
  }
)

export default PostReaction
