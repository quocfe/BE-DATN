import { Sequelize, QueryInterface, DataTypes } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('NotifyGroupMessages', {
      notify_group_message_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      group_message_id: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: 'GroupMessages',
          key: 'group_message_id'
        },
        onDelete: 'CASCADE'
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING
      },
      receiver_id: {
        allowNull: false,
        type: DataTypes.STRING
      },
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      type: {
        allowNull: false,
        type: DataTypes.INTEGER
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
    await queryInterface.dropTable('NotifyGroupMessages')
  }
}
