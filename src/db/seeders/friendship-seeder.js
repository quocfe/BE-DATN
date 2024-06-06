'use strict'
/** @type {import('sequelize-cli').Migration} */
const { hashSync, genSaltSync } = require('bcryptjs')
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Friendships',
      [
        {
          friendship_id: 'qwyi3c73-f703-4b16-847d-f61bae05oa2i',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          friend_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'iopa3c73-f703-4b16-847d-f61bae05ola9',
          user_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          friend_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'a01a3c73-f703-4b16-847d-f61bae05pao1',
          user_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          friend_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          status: 'Chờ chấp nhận'
        },
        {
          friendship_id: 'yuaz3c73-f703-4b16-847d-f61bae05n81m',
          user_id: 'sanji-22c73-f703-4b16-847d-f61bae05-onepiece',
          friend_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          status: 'Đã chặn'
        },
        {
          friendship_id: 'jai13c73-f703-4b16-847d-f61bae05nxx7',
          user_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          friend_id: 'nami-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'xja13c73-f703-4b16-847d-f61bae05n0p1',
          user_id: 'nami-22c73-f703-4b16-847d-f61bae05-onepiece',
          friend_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'a17a3c73-f703-4b16-847d-f61bae05n0lop',
          user_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          friend_id: 'akainu-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'da12z3c73-f703-4b16-847d-f61bae05n0lzao1',
          user_id: 'akainu-22c73-f703-4b16-847d-f61bae05-onepiece',
          friend_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Đã chấp nhận'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Friendships', null, {})
  }
}
