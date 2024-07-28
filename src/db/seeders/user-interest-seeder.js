'use strict'
/** @type {import('sequelize-cli').Migration} */
const { hashSync, genSaltSync } = require('bcryptjs')
module.exports = {
  async up(queryInterface, Sequelize) {
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

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserInterests', null, {})
  }
}
