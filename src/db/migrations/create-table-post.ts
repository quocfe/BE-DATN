import { QueryInterface, Sequelize, DataTypes } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Posts', {
      post_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      content: {
        allowNull: true,
        type: DataTypes.STRING
      },
      privary: {
        allowNull: true,
        type: DataTypes.ENUM('public', 'friends', 'private')
      },
      location: {
        allowNull: true,
        type: DataTypes.STRING
      },
      post_type: {
        allowNull: true,
        type: DataTypes.ENUM('user', 'fanpage')
      },
      user_id: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: 'Users',
          key: 'user_id'
        }
      },
      fanpage_id: {
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
    await queryInterface.dropTable('Posts')
  }
}
