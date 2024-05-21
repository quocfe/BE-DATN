import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export interface ProfileAttributes {
  profile_id: string
  phone_number: number
  date_of_birth: Date
  biography: string
  profile_picture: string
  cover_photo: string
  home_town: string
  education: string
  job: string
  alias: string
  user_id: string
  createdAt: Date
  updatedAt: Date
}

interface ProfileCreationAttribute extends Partial<Profile> {}

class Profile extends Model<ProfileAttributes, ProfileCreationAttribute> implements ProfileAttributes {
  declare profile_id: string
  declare phone_number: number
  declare date_of_birth: Date
  declare biography: string
  declare profile_picture: string
  declare cover_photo: string
  declare home_town: string
  declare education: string
  declare job: string
  declare alias: string
  declare user_id: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Profile.init(
  {
    profile_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    phone_number: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    date_of_birth: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: null
    },
    biography: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: ''
    },
    profile_picture: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'https://thespiritofsaigon.net/wp-content/uploads/2022/10/avatar-vo-danh-15.jpg'
    },
    cover_photo: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue:
        'https://static.vecteezy.com/system/resources/previews/006/852/817/non_2x/abstract-colorful-gradient-lines-with-blue-and-pink-light-on-purple-background-free-vector.jpg'
    },
    home_town: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: ''
    },
    education: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: ''
    },
    job: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: ''
    },
    alias: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: ''
    },
    user_id: {
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
    modelName: 'Profile',
    tableName: 'Profiles'
  }
)

export default Profile
