import { QueryInterface, Sequelize, DataTypes } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Users', {
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      first_name: {
        allowNull: true,
        type: DataTypes.STRING
      },
      last_name: {
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
      gender: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      code: {
        allowNull: true,
        type: DataTypes.STRING
      },
      is_auth: {
        allowNull: true,
        type: DataTypes.BOOLEAN
      },
      expires: {
        allowNull: true,
        type: DataTypes.STRING
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
    await queryInterface.dropTable('Users')
  }
}
