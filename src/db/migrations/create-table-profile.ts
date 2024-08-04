import { QueryInterface, Sequelize, DataTypes } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Profiles', {
      profile_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      phone_number: {
        allowNull: true,
        type: DataTypes.STRING
      },
      date_of_birth: {
        allowNull: true,
        type: DataTypes.DATE
      },
      biography: {
        allowNull: true,
        type: DataTypes.STRING
      },
      profile_picture: {
        allowNull: true,
        type: DataTypes.STRING
      },
      cover_photo: {
        allowNull: true,
        type: DataTypes.STRING
      },
      home_town: {
        allowNull: true,
        type: DataTypes.STRING
      },
      relationship_status: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      education: {
        allowNull: true,
        type: DataTypes.STRING
      },
      job: {
        allowNull: true,
        type: DataTypes.STRING
      },
      alias: {
        allowNull: true,
        type: DataTypes.STRING
      },
      user_id: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          key: 'user_id',
          model: 'Users'
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
    await queryInterface.dropTable('Profiles')
  }
}
