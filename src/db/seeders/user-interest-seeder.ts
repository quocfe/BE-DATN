import { QueryInterface } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      'UserInterests',
      [
        {
          id: 1,
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          interest_id: 'ap123c73-f703-4b16-847d-f61bae053a1z'
        },
        {
          id: 2,
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          interest_id: 'fp623h28-f703-4b16-847d-f61bae053f6u'
        }
      ],
      {}
    )
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('UserInterests', {}, {})
  }
}
