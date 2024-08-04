import { QueryInterface, Sequelize, DataTypes } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Fanpages', {
      fanpage_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      group_name: {
        allowNull: true,
        type: DataTypes.STRING
      },
      description: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      followers_count: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      likes_count: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      category: {
        allowNull: true,
        type: DataTypes.STRING
      },
      address: {
        allowNull: true,
        type: DataTypes.STRING
      },
      phone: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      is_public: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      role_id: {
        allowNull: false,
        type: DataTypes.STRING
      },
      user_id: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: 'Users', // Tên bảng chứa khóa ngoại
          key: 'user_id'
        }
      },
      image_url: {
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
    await queryInterface.dropTable('Fanpages')
  }
}
