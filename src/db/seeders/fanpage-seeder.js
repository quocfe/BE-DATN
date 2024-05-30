
'use strict';

/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Fanpages',
      [
        {
          fanpage_id: uuidv4(),
          group_name: 'Mugiwara Pirates',
          description: 'Fanpage của nhóm hải tặc Mũ Rơm, nơi cập nhật tin tức và hoạt động của băng nhóm.',
          followers_count: 5000,
          likes_count: 4500,
          category: 'Entertainment',
          address: 'Grand Line, East Blue',
          phone: '123-456-7890',
          is_public: true,
          role_id: 'role-id-1',
          user_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fanpage_id: uuidv4(),
          group_name: 'Kanisdev Tech Community',
          description: 'Fanpage của cộng đồng công nghệ Kanisdev, nơi chia sẻ kiến thức và tin tức công nghệ.',
          followers_count: 3000,
          likes_count: 2800,
          category: 'Technology',
          address: '123 Tech Street, Silicon Valley',
          phone: '098-765-4321',
          is_public: true,
          role_id: 'role-id-2',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Fanpages', null, {});
  }
};