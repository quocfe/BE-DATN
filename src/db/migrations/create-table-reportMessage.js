'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ReportMessages', {
      report_message_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      message_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Messages',
          key: 'message_id'
        },
        onDelete: 'CASCADE'
      },
      user_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      reason: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ReportMessages')
  }
}
