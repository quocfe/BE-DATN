
import { DataTypes, QueryInterface, Sequelize } from "sequelize"

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('video-report', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      video_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      reason: {
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
    await queryInterface.dropTable('video-report')
  }
}
