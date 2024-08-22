import { DataTypes, QueryInterface, Sequelize } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('comment-videos', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      video_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Videos',
          key: 'id'
        }
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'user_id'
        }
      },
      mentioned_user_id: {
        type: DataTypes.STRING,
        allowNull: true
      },
      parent_id: {
        type: DataTypes.STRING,
        allowNull: true
      },
      content: {
        allowNull: true,
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
    await queryInterface.dropTable('comment-videos')
  }
}
