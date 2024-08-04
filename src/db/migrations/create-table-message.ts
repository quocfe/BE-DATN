import { Sequelize, QueryInterface, DataTypes } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Messages', {
      message_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      body: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      sub_body: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      status: {
        allowNull: true,
        type: DataTypes.BOOLEAN
      },
      group_message_id: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: 'GroupMessages',
          key: 'group_message_id'
        },
        onDelete: 'CASCADE'
      },
      parent_id: {
        allowNull: true,
        type: DataTypes.STRING
      },
      createdBy: {
        allowNull: false,
        type: DataTypes.STRING
      },
      type: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      is_report: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      report_count: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0
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
    await queryInterface.dropTable('Messages')
  }
}
