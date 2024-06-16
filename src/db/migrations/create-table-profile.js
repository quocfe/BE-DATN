'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Profiles', {
      profile_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      phone_number: {
        allowNull: true,
        type: Sequelize.STRING
      },
      date_of_birth: {
        allowNull: true,
        type: Sequelize.DATE
      },
      biography: {
        allowNull: true,
        type: Sequelize.STRING
      },
      profile_picture: {
        allowNull: true,
        type: Sequelize.STRING
      },
      cover_photo: {
        allowNull: true,
        type: Sequelize.STRING
      },
      home_town: {
        allowNull: true,
        type: Sequelize.STRING
      },
      relationship_status: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      education: {
        allowNull: true,
        type: Sequelize.STRING
      },
      job: {
        allowNull: true,
        type: Sequelize.STRING
      },
      alias: {
        allowNull: true,
        type: Sequelize.STRING
      },
      user_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          key: 'user_id',
          model: 'Users'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Profiles')
  }
}
