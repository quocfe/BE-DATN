'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MemberGroups', {
      member_group_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      user_id: {
        allowNull: true,
        type: Sequelize.STRING
      },
      group_message_id: {
        allowNull: true,
        type: Sequelize.STRING,
        references: {
          model: 'GroupMessages',
          key: 'group_message_id'
        },
        onDelete: 'CASCADE'
      },

      role: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      status: {
        allowNull: true,
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('MemberGroups')
  }
}
