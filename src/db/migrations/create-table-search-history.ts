import { QueryInterface, Sequelize, DataTypes } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('SearchHistories', {
      search_history_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      user_id: {
        allowNull: true,
        type: DataTypes.STRING,
        references: {
          model: 'Users',
          key: 'user_id'
        }
      },
      target_id: {
        allowNull: false,
        type: DataTypes.STRING
      },
      search_type: {
        allowNull: false,
        type: DataTypes.ENUM('user', 'fanpage')
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
    await queryInterface.dropTable('SearchHistories')
  }
}
