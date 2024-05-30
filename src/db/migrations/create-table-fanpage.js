'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Fanpages', {
      fanpage_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      group_name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      followers_count: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      likes_count: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      category: {
        allowNull: true,
        type: Sequelize.STRING
      },
      address: {
        allowNull: true,
        type: Sequelize.STRING
      },
      phone: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      is_public: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      role_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      user_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Users', // Tên bảng chứa khóa ngoại
          key: 'user_id'
        }
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
    await queryInterface.dropTable('Fanpages')
  }
}
