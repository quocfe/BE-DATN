import { QueryInterface, Sequelize, DataTypes } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('PostReactions', {
      post_reaction_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      post_id: {
        allowNull: true,
        type: DataTypes.STRING,
        references: {
          model: 'Posts',
          key: 'post_id'
        },
        onDelete: 'CASCADE'
      },
      user_id: {
        allowNull: true,
        type: DataTypes.STRING,
        references: {
          model: 'Users',
          key: 'user_id'
        },
        onDelete: 'CASCADE'
      },
      type: {
        allowNull: true,
        type: DataTypes.ENUM('like', 'love', 'haha', 'sad', 'wow', 'angry')
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
    await queryInterface.dropTable('PostReactions')
  }
}
