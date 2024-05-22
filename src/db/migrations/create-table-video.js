'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Videos', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      content: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      title: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      link: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      tag: {
        allowNull: true,
        type: Sequelize.STRING
      },
      privacy: {
        allowNull: false,
        type: Sequelize.STRING
      },
      view: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      category_video_id: {
        allowNull: true,
        type: Sequelize.STRING,
        references: {
          model: CategoryVideoModel, // Tham chiếu tới model Category
          key: 'id' // Khóa chính của model Category
        }
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: User, // Tham chiếu tới model Category
          key: 'user_id' // Khóa chính của model Category
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
    await queryInterface.dropTable('Videos')
  }
}
