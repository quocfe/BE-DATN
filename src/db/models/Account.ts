import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export interface AccountAttributes {
  account_id: string
  username: string
  email: string
  password: string
  status: string
  last_login: Date
  profile_picture: string
  phone_number: string
  address: string
  date_of_birth: Date
  role_id: string
  createdAt: Date
  updatedAt: Date
}

interface AccountCreationAttribute
  extends Optional<
    AccountAttributes,
    'last_login' | 'profile_picture' | 'account_id' | 'role_id' | 'status' | 'createdAt' | 'updatedAt'
  > {}

class Account extends Model<AccountAttributes, AccountCreationAttribute> implements AccountAttributes {
  declare account_id: string
  declare username: string
  declare email: string
  declare password: string
  declare status: string
  declare last_login: Date
  declare profile_picture: string
  declare phone_number: string
  declare address: string
  declare date_of_birth: Date
  declare role_id: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Account.init(
  {
    account_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    username: {
      allowNull: true,
      type: DataTypes.STRING
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      allowNull: true,
      type: DataTypes.STRING
    },
    status: {
      allowNull: true,
      type: DataTypes.ENUM('Đang hoạt động', 'Ngừng hoạt động', 'Đóng băng', 'Khóa vĩnh viễn')
    },
    last_login: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: null
    },
    profile_picture: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg'
    },
    phone_number: {
      allowNull: true,
      type: DataTypes.STRING
    },
    address: {
      allowNull: true,
      type: DataTypes.STRING
    },
    date_of_birth: {
      allowNull: true,
      type: DataTypes.DATE
    },
    role_id: {
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
    modelName: 'Account',
    tableName: 'Accounts'
  }
)

export default Account
