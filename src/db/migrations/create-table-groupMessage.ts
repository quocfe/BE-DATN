import { DataTypes, QueryInterface, Sequelize } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('GroupMessages', {
      group_message_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      group_name: {
        allowNull: true,
        type: DataTypes.STRING
      },
      status: {
        allowNull: true,
        type: DataTypes.BOOLEAN
      },
      type: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      group_thumbnail: {
        allowNull: true,
        type: DataTypes.STRING
      },
      createdBy: {
        allowNull: true,
        type: DataTypes.STRING,
        references: {
          model: 'Users',
          key: 'user_id'
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
    await queryInterface.dropTable('GroupMessages')
  }
}
