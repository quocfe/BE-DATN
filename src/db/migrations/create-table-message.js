'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      message_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      body: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      sub_body: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      status: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      group_message_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'GroupMessages',
          key: 'group_message_id'
        },
        onDelete: 'CASCADE'
      },
      parent_id: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.STRING
      },
      type: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      is_report: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      report_count: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
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
    await queryInterface.dropTable('Messages')
  }
}
