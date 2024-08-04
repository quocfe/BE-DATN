import { QueryInterface, Sequelize, DataTypes } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('RoleModulePermissions', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
      },
      role_id: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: 'Roles',
          key: 'role_id'
        },
        onDelete: 'CASCADE'
      },
      module_id: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: 'Modules',
          key: 'module_id'
        },
        onDelete: 'CASCADE'
      },
      permission_id: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: 'Permissions',
          key: 'permission_id'
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
    await queryInterface.dropTable('RoleModulePermissions')
  }
}
