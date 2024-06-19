import { QueryInterface, Sequelize, DataTypes } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Accounts', {
      account_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
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
        type: DataTypes.DATE
      },
      profile_picture: {
        allowNull: true,
        type: DataTypes.STRING
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
        type: DataTypes.STRING,
        references: {
          model: 'Roles',
          key: 'role_id'
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    })
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('Accounts')
  }
}
