import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export interface PostMediaResourceAttributes {
  media_id: string
  post_id: string
  media_url: string
  media_type: string
  createdAt: Date
  updatedAt: Date
}

interface PostMediaResourceCreationAttribute
  extends Optional<PostMediaResourceAttributes, 'media_id' | 'createdAt' | 'updatedAt'> {}

class PostMediaResource
  extends Model<PostMediaResourceAttributes, PostMediaResourceCreationAttribute>
  implements PostMediaResourceAttributes
{
  declare media_id: string
  declare post_id: string
  declare media_url: string
  declare media_type: 'image' | 'video'
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

PostMediaResource.init(
  {
    media_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    post_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    media_url: {
      allowNull: true,
      type: DataTypes.STRING
    },
    media_type: {
      allowNull: true,
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
    modelName: 'PostMediaResource',
    tableName: 'PostMediaResources'
  }
)

export default PostMediaResource
