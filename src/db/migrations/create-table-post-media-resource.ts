import { QueryInterface, Sequelize, DataTypes } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('PostMediaResources', {
      media_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      post_id: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: 'Posts',
          key: 'post_id'
        },
        onDelete: 'CASCADE'
      },
      media_url: {
        allowNull: false,
        type: DataTypes.STRING
      },
      media_type: {
        allowNull: false,
        type: DataTypes.ENUM('image', 'video')
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
    await queryInterface.dropTable('PostMediaResources')
  }
}
