'use strict'
/** @type {import('sequelize-cli').Migration} */
const { hashSync, genSaltSync } = require('bcryptjs')
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Videos',
      [
        {
          id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          content: 'Review Phim Hay',
          url: 'https://res.cloudinary.com/dpredqy2e/video/upload/v1/samples/627027558291684875_ablez5.mp4?_s=vp-2.0.2',
          public_id: 'uy6fzru9cxhff8b7r154',
          tag: '',
          privacy: '',
          view: 0,
          category_video_id: '',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002'
        },
        {
          id: 'sanji-22c73-f703-4b16-847d-f61bae05-onepiece',
          content:
            'Review Phim Siêu Nhân Là Sát Thủ Khét Tiếng Ẩn Thân | Review Phim Siêu Nhân  #reviewphim #phimtrungquoc #tomtatphim #phim #reviewphimhay #phimhay',
          url: 'https://res.cloudinary.com/dpredqy2e/video/upload/1896993282881069263_gaskeu.mp4?_s=vp-2.0.2',
          public_id: 'uy6fzru9cxhff8b7r154',
          tag: '',
          privacy: '',
          view: 0,
          category_video_id: '',
          user_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Videos', null, {})
  }
}
