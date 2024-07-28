import { QueryInterface } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      'PostCommentReplies',
      [
        {
          comment_reply_id: '0a8eabe0-b03e-4b2f-bfde-9b6e34076b5f',
          content: 'Trả lời bình luận của luffy 2',
          media_url: null,
          comment_id: 'a064a687-bae8-49a2-a4ef-4dd98c18d801',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          replied_to_user_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece'
        },
        {
          comment_reply_id: '9a0d718c-eb13-4dc1-aba8-a0822b2766bb',
          content: 'Trả lời bình luận của luffy bằng ảnh/video',
          media_url: 'https://res.cloudinary.com/dswainylr/image/upload/v1720019130/uploads/dvozajpx6knhh6m8w1w1.jpg',
          comment_id: 'a064a687-bae8-49a2-a4ef-4dd98c18d801',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          replied_to_user_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece'
        },
        {
          comment_reply_id: '6c6cc267-b165-4607-a286-d18bc1f609c9',
          content: 'Trả lời bình luận của luffy',
          media_url: null,
          comment_id: 'a064a687-bae8-49a2-a4ef-4dd98c18d801',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          replied_to_user_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece'
        }
      ],
      {}
    )
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('PostCommentReplies', {}, {})
  }
}
