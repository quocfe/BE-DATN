import { QueryInterface } from 'sequelize'
import { hashSync, genSaltSync } from 'bcryptjs'
import { v4 }  from'uuid'


export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      'Fanpages',
      [
        {
          fanpage_id: v4(),
          group_name: 'Mugiwara Pirates',
          description: 'Fanpage của nhóm hải tặc Mũ Rơm, nơi cập nhật tin tức và hoạt động của băng nhóm.',
          followers_count: 5000,
          likes_count: 4500,
          category: 'Entertainment',
          address: 'Grand Line, East Blue',
          phone: '1234567890',
          is_public: true,
          role_id: 'role-id-1',
          user_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          image_url: 'https://media.fmplus.com.vn/uploads/sliders/3db10944-7817-4c48-9565-dcf816a840ee.jpg', 
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fanpage_id: v4(),
          group_name: 'Kanisdev Tech Community',
          description: 'Fanpage của cộng đồng công nghệ Kanisdev, nơi chia sẻ kiến thức và tin tức công nghệ.',
          followers_count: 3000,
          likes_count: 2800,
          category: 'Technology',
          address: '123 Tech Street, Silicon Valley',
          phone: '0987654321',
          is_public: true,
          role_id: 'role-id-2',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          image_url: 'https://media.fmplus.com.vn/uploads/sliders/33ac9a2a-5900-4ad1-8895-cec0719779fb.png',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('Fanpages', {}, {});
  }
};


