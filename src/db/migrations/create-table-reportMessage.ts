import { Sequelize, QueryInterface, DataTypes } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('ReportMessages', {
      report_message_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      message_id: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: 'Messages',
          key: 'message_id'
        },
        onDelete: 'CASCADE'
      },
      user_id: {
        allowNull: false,
        type: DataTypes.STRING
      },
      reason: {
        allowNull: false,
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
    await queryInterface.dropTable('ReportMessages')
  }
}
