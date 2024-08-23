import { DataTypes, QueryInterface, Sequelize } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Videos', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      content: {
        allowNull: true,
        type: DataTypes.STRING
      },
      contentText: {
        allowNull: true,
        type: DataTypes.STRING
      },
      title: {
        allowNull: true,
        type: DataTypes.STRING
      },
      url: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      public_id: {
        allowNull: true,
        type: DataTypes.STRING
      },
      tag: {
        allowNull: true,
        type: DataTypes.STRING
      },
      privacy: {
        allowNull: false,
        type: DataTypes.STRING
      },
      view: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      duration: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      category_video_id: {
        allowNull: true,
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
      // list_like_user_id: {
      //   type: DataTypes.STRING,
      //   allowNull: true
      // },
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
    await queryInterface.dropTable('Videos')
  }
}
