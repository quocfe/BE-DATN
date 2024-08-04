'use strict'
/** @type {import('sequelize-cli').Migration} */
const { hashSync, genSaltSync } = require('bcryptjs')
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Videos',
      [
        {
          id: 'eb7f8e8d-639a-4601-b9cd-976fa336f81d',
          content:
            '[{"type":"paragraph","children":[{"text":"Review Phim Feniks 2023 Ông Chú Đầu Bếp Bị Lũ Côn Đồ Đánh Đập Sỉ Nhục Hóa Ra Lại Là Sát Thủ Khét Tiếng Ẩn Thân | Review Phim Feniks 2023 #reviewphim #phimtrungquoc #tomtatphim #phim #reviewphimhay #phimhay"}]}]',
          contentText: '',
          url: 'https://res.cloudinary.com/dpredqy2e/video/upload/1896993282881069263_gaskeu.mp4?_s=vp-2.0.2',
          public_id: 'uy6fzru9cxhff8b7r154',
          tag: '',
          duration: 0,
          privacy: '',
          view: 0,
          duration: 0,
          category_video_id: '',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Videos', null, {})
  }
}
