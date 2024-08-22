import { DataTypes, QueryInterface, Sequelize } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('like-videos', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'user_id'
        }
      },
      video_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Videos',
          key: 'id'
        }
      },
      comment_id: {
        type: DataTypes.STRING,
        allowNull: true
      },
      like_type: {
        type: DataTypes.STRING,
        allowNull: false
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
    await queryInterface.dropTable('like-videos')
  }
}
