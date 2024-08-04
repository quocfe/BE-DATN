import { DataTypes, QueryInterface, Sequelize } from "sequelize";

export default  {
  async up(queryInterface:  QueryInterface) {
    await queryInterface.createTable('Stories', {
      story_id:{
        allowNull :false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      user_id: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: 'Users',
          key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      text:{
        allowNull: false,
        type: DataTypes.STRING
      },
      content:{
        allowNull: false,
        type: DataTypes.STRING
      },
     
      story_view:{
        allowNull: true,
        type : DataTypes.STRING
      },
      privacy: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ['public', 'private', 'friends-only']
      },
      story_time:{
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      tag:{
        allowNull: false,
        type: DataTypes.STRING
      },
      is_archived :{
        allowNull: false,
        type: DataTypes.BOOLEAN 
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Sử dụng Sequelize.literal
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Sử dụng Sequelize.literal
      }
      
    });
  },

  async down(queryInterface:  QueryInterface) {
    await queryInterface.dropTable('Stories');
  }
};
