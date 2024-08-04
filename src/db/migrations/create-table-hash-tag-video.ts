
import { DataTypes, QueryInterface, Sequelize } from "sequelize"

export default  {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('hash-tag-video', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      tag: {
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
    await queryInterface.dropTable('hash-tag-video')
  }
}
