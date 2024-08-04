import { QueryInterface, Sequelize, DataTypes } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('PostCommentReplies', {
      comment_reply_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      content: {
        allowNull: true,
        type: DataTypes.STRING
      },
      media_url: {
        allowNull: true,
        type: DataTypes.STRING
      },
      comment_id: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: 'PostComments',
          key: 'comment_id'
        },
        onDelete: 'CASCADE'
      },
      user_id: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: 'Users',
          key: 'user_id'
        },
        onDelete: 'CASCADE'
      },
      replied_to_user_id: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: 'Users',
          key: 'user_id'
        },
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('PostCommentReplies')
  }
}
