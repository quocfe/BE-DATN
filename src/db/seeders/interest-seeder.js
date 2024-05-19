'use strict'
/** @type {import('sequelize-cli').Migration} */
const { hashSync, genSaltSync } = require('bcryptjs')
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Interests',
      [
        {
          interest_id: 'ap123c73-f703-4b16-847d-f61bae053a1z',
          interest_name: 'Đọc sách'
        },
        {
          interest_id: 'bp223d84-f703-4b16-847d-f61bae053b2y',
          interest_name: 'Viết lách'
        },
        {
          interest_id: 'cp323e95-f703-4b16-847d-f61bae053c3x',
          interest_name: 'Đi bộ đường dài'
        },
        {
          interest_id: 'dp423f06-f703-4b16-847d-f61bae053d4w',
          interest_name: 'Chạy bộ'
        },
        {
          interest_id: 'ep523g17-f703-4b16-847d-f61bae053e5v',
          interest_name: 'Nấu ăn'
        },
        {
          interest_id: 'fp623h28-f703-4b16-847d-f61bae053f6u',
          interest_name: 'Vẽ tranh'
        },
        {
          interest_id: 'gp723i39-f703-4b16-847d-f61bae053g7t',
          interest_name: 'Chơi nhạc cụ'
        },
        {
          interest_id: 'hp823j40-f703-4b16-847d-f61bae053h8s',
          interest_name: 'Học ngôn ngữ'
        },
        {
          interest_id: 'ip923k51-f703-4b16-847d-f61bae053i9r',
          interest_name: 'Chơi thể thao'
        },
        {
          interest_id: 'jp024l62-f703-4b16-847d-f61bae053j0q',
          interest_name: 'Cắm trại'
        },
        {
          interest_id: 'kp124m73-f703-4b16-847d-f61bae053k1p',
          interest_name: 'Nghe nhạc'
        },
        {
          interest_id: 'lp224n84-f703-4b16-847d-f61bae053l2o',
          interest_name: 'Xem phim'
        },
        {
          interest_id: 'mp324o95-f703-4b16-847d-f61bae053m3n',
          interest_name: 'Làm vườn'
        },
        {
          interest_id: 'np424p06-f703-4b16-847d-f61bae053n4m',
          interest_name: 'Đi du lịch'
        },
        {
          interest_id: 'op524q17-f703-4b16-847d-f61bae053o5l',
          interest_name: 'Chụp ảnh'
        },
        {
          interest_id: 'pp624r28-f703-4b16-847d-f61bae053p6k',
          interest_name: 'Thiền'
        },
        {
          interest_id: 'qp724s39-f703-4b16-847d-f61bae053q7j',
          interest_name: 'Yoga'
        },
        {
          interest_id: 'rp824t40-f703-4b16-847d-f61bae053r8i',
          interest_name: 'Khiêu vũ'
        },
        {
          interest_id: 'sp924u51-f703-4b16-847d-f61bae053s9h',
          interest_name: 'Lập trình'
        },
        {
          interest_id: 'tp025v62-f703-4b16-847d-f61bae053t0g',
          interest_name: 'Sưu tầm đồ cổ'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Interests', null, {})
  }
}
