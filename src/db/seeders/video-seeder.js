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
            'Review Phim Feniks 2023 Ông Chú Đầu Bếp Bị Lũ Côn Đồ Đánh Đập Sỉ Nhục Hóa Ra Lại Là Sát Thủ Khét Tiếng Ẩn Thân | Review Phim Feniks 2023 #reviewphim #phimtrungquoc #tomtatphim #phim #reviewphimhay #phimhay',
          url: 'http://res.cloudinary.com/dizwixa7c/video/upload/v1717088537/uy6fzru9cxhff8b7r154.mp4',
          public_id: 'uy6fzru9cxhff8b7r154',
          tag: '',
          privacy: '',
          view: 0,
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
