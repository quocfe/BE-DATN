import { QueryInterface } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      'SearchHistories',
      [
        {
          search_history_id: 'ui61-ja-22c73-f703-4b16-847d-f61bae05-xhxja',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          target_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          search_type: 'user'
        },
        {
          search_history_id: 'op91z-ja-22c73-f703-4b16-847d-f61bae05-09iq',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          target_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          search_type: 'user'
        },
        {
          search_history_id: 'uqu32-ja-22c73-f703-4b16-847d-f61bae05-lzo',
          user_id: 'sanji-22c73-f703-4b16-847d-f61bae05-onepiece',
          target_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          search_type: 'user'
        },
        {
          search_history_id: 'yui1s-ja-22c73-f703-4b16-847d-f61bae05-pio',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          target_id: 'nami-22c73-f703-4b16-847d-f61bae05-onepiece',
          search_type: 'user'
        },
        {
          search_history_id: 'it1a-ja-22c73-f703-4b16-847d-f61bae05-pa1io',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          target_id: 'usopp-22c73-f703-4b16-847d-f61bae05-onepiece',
          search_type: 'user'
        },
        {
          search_history_id: 'piq28as-ja-22c73-f703-4b16-847d-f61bae05-piods1',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          target_id: 'robin-22c73-f703-4b16-847d-f61bae05-onepiece',
          search_type: 'user'
        },
        {
          search_history_id: 'u17a1-ja-22c73-f703-4b16-847d-f61bae05-lao1',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          target_id: 'jinbei-22c73-f703-4b16-847d-f61bae05-onepiece',
          search_type: 'user'
        },
        {
          search_history_id: 'iao1s-ja-22c73-f703-4b16-847d-f61bae05-lao1',
          user_id: 'jinbei-22c73-f703-4b16-847d-f61bae05-onepiece',
          target_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          search_type: 'user'
        },
        {
          search_history_id: 'uayaqi1-ja-22c73-f703-4b16-847d-f61bae05-pio',
          user_id: 'nami-22c73-f703-4b16-847d-f61bae05-onepiece',
          target_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          search_type: 'user'
        },
        {
          search_history_id: 'it11a-ja-22c73-f703-4b16-847d-f61bae05-pa1io',
          user_id: 'usopp-22c73-f703-4b16-847d-f61bae05-onepiece',
          target_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          search_type: 'user'
        },
        {
          search_history_id: 'ya2u1s-ja-22c73-f703-4b16-847d-f61bae05-piods1',
          user_id: 'robin-22c73-f703-4b16-847d-f61bae05-onepiece',
          target_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          search_type: 'user'
        }
      ],
      {}
    )
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('SearchHistories', {}, {})
  }
}
