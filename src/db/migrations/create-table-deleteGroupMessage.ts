import { DataTypes, QueryInterface, Sequelize } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('DeleteGroupMessages', {
      delete_group_message_id: {
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
      deletedBy: {
        allowNull: false,
        type: DataTypes.STRING
      },
      deletedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true
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
    await queryInterface.dropTable('DeleteGroupMessages')
  }
}
