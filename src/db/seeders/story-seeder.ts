import { QueryInterface } from 'sequelize'
export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      'Stories',
      [
        {
          story_id: 's1234567890',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          text: 'Hôm nay là một ngày tuyệt vời!',
          content: 'https://example.com/image1.jpg',
          story_view: 2,
          privacy: 'public',
          story_time: 21 / 5 / 2024,
          tag: 'happiness'
        },
        {
          story_id: 's0987654321',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          text: 'Cảm giác thật tuyệt vời khi ở bên gia đình!',
          content: 'https://example.com/image2.jpg',

          story_view: 3,
          privacy: 'friends-only',
          story_time: 21 / 5 / 2024,
          tag: 'family'
        },
        {
          story_id: 's098765432s0987654322',
          user_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          text: 'Cảm giác thật tuyệt tệ!',
          content: 'https://example.com/image2.jpg',

          story_view: 3,
          privacy: 'friends-only',
          story_time: 21 / 5 / 2024,
          tag: 'family',
          is_archived: true
        }
      ],
      {}
    )
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('Stories', {}, {})
  }
}
