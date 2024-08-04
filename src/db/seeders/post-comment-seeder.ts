import { QueryInterface } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      'PostComments',
      [
        {
          comment_id: 'a064a687-bae8-49a2-a4ef-4dd98c18d801',
          content: 'Đây là bình luận hình ảnh 1',
          media_url:
            'https://w0.peakpx.com/wallpaper/70/788/HD-wallpaper-one-piece-luffy-with-background-of-blue-sky-anime.jpg',
          post_id: '397236d5-0097-4ade-845f-24e429ef0e01',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002'
        },
        {
          comment_id: 'a064a687-bae8-49a2-a4ef-4dd98c18d803',
          content: 'Đây là bình luận nội dung 1',
          media_url: null,
          post_id: '397236d5-0097-4ade-845f-24e429ef0e01',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002'
        },
        {
          comment_id: 'a064a687-bae8-49a2-a4ef-4dd98c18d809',
          content: 'Đây là bình luận nội dung 2',
          media_url: null,
          post_id: '397236d5-0097-4ade-845f-24e429ef0e01',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002'
        },
        {
          comment_id: 'a064a687-bae8-49a2-a4ef-4dd98c18d806',
          content: 'Đây là bình luận nội dung',
          media_url: null,
          post_id: '397236d5-0097-4ade-845f-24e429ef0e02',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002'
        }
      ],
      {}
    )
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('PostComments', {}, {})
  }
}
