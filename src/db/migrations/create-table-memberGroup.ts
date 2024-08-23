import { Sequelize, QueryInterface, DataTypes } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('MemberGroups', {
      member_group_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      user_id: {
        allowNull: true,
        type: DataTypes.STRING,
        references: {
          model: 'Users',
          key: 'user_id'
        }
      },
      group_message_id: {
        allowNull: true,
        type: DataTypes.STRING,
        references: {
          model: 'GroupMessages',
          key: 'group_message_id'
        },
        onDelete: 'CASCADE'
      },

      role: {
        allowNull: true,
        type: DataTypes.BOOLEAN
      },
      status: {
        allowNull: true,
        type: DataTypes.BOOLEAN
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
    await queryInterface.dropTable('MemberGroups')
  }
}
