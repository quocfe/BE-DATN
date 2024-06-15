'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NotifyGroupMessages', {
      notify_group_message_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
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
      content: {
        allowNull: false,
        type: Sequelize.STRING
      },
      receiver_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      type: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('NotifyGroupMessages')
  }
}
