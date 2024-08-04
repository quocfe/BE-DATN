import { QueryInterface } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      'PostMediaResources',
      [
        {
          media_id: 'ap123c73-f703-4b16-847d-f61bae053a01',
          post_id: '397236d5-0097-4ade-845f-24e429ef0e01',
          media_url: 'https://wallpapers.com/images/featured/one-piece-c0pujiakubq5rwas.jpg',
          media_type: 'image'
        },
        {
          media_id: 'ap123c73-f703-4b16-847d-f61bae053a02',
          post_id: '397236d5-0097-4ade-845f-24e429ef0e01',
          media_url: 'https://wallpapergod.com/images/hd/one-piece-2560X1440-wallpaper-d9yjswfrzice8o04.jpeg',
          media_type: 'image'
        },
        {
          media_id: 'ap123c73-f703-4b16-847d-f61bae053a03',
          post_id: '397236d5-0097-4ade-845f-24e429ef0e034',
          media_url:
            'https://static.wixstatic.com/media/9d8ed5_6b6be1c97d1949c2b48bbdd68069ee35~mv2.jpg/v1/fill/w_1000,h_563,al_c/9d8ed5_6b6be1c97d1949c2b48bbdd68069ee35~mv2.jpg',
          media_type: 'image'
        },
        {
          media_id: 'ap123c73-f703-4b16-847d-f61bae053a04',
          post_id: '397236d5-0097-4ade-845f-24e429ef0e035',
          media_url:
            'https://vietotaku.com/wp-content/uploads/2023/05/jinbe-ngoai-hinh-tinh-cach-va-suc-manh-cua-hiep-si-bien-ca-1-e1685267759779-750x375.jpg?v=1685267723',
          media_type: 'image'
        },
        {
          media_id: 'ap123c73-f703-4b16-847d-f61bae053a05',
          post_id: '397236d5-0097-4ade-845f-24e429ef0e035',
          media_url: 'https://gamek.mediacdn.vn/133514250583805952/2020/4/5/l6-15860620170441866616716.jpeg',
          media_type: 'image'
        },
        {
          media_id: 'ap123c73-f703-4b16-847d-f61bae053a06',
          post_id: '397236d5-0097-4ade-845f-24e429ef0e036',
          media_url: 'https://cdn.popsww.com/blog/sites/2/2023/09/jinbe-wano.jpg',
          media_type: 'image'
        },
        {
          media_id: 'ap123c73-f703-4b16-847d-f61bae053a07',
          post_id: '397236d5-0097-4ade-845f-24e429ef0e037',
          media_url: 'https://acrossmag.com/wp-content/uploads/2022/11/zoro-roronoa-2022-birthday-one-piece.jpg',
          media_type: 'image'
        }
      ],
      {}
    )
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('PostMediaResources', {}, {})
  }
}
