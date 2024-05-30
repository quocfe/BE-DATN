'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stories', {
      story_id:{
        allowNull :false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      user_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      text:{
        allowNull: false,
        type: Sequelize.STRING
      },
      content:{
        allowNull: false,
        type: Sequelize.STRING
      },
      music:{
        allowNull: false,
        type: Sequelize.STRING
      },
      story_view:{
        allowNull: true,
        type : Sequelize.STRING
      },
      privacy: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['public', 'private', 'friends-only']
      },
      story_time:{
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      tag:{
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Sử dụng Sequelize.literal
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Sử dụng Sequelize.literal
      }
      
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Stories');
  }
};
