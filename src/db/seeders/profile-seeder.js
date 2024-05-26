'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Profiles',
      [
        {
          profile_id: '0a303a83-9e0c-4864-9115-72345ab30075',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg',
          cover_photo:
            'https://static.vecteezy.com/system/resources/previews/006/852/817/non_2x/abstract-colorful-gradient-lines-with-blue-and-pink-light-on-purple-background-free-vector.jpg',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002'
        },
        {
          profile_id: 'er1tya83-9e0c-4864-9115-72345ab3vaty',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture: 'https://i.pinimg.com/736x/0e/b6/5a/0eb65a09ad6a7e7d6da86ab1149ef9da.jpg',
          cover_photo: 'https://images3.alphacoders.com/130/1305748.jpg',
          home_town: '',
          education: '',
          relationship_status: 0,
          job: '',
          alias: '',
          user_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece'
        },
        {
          profile_id: 'ui19ya83-9e0c-4864-9115-72345ab3mlax',
          phone_number: null,
          date_of_birth: null,
          biography: 'Thợ săn hải tặc - Kiếm sĩ lạc đường',
          profile_picture: 'https://i.pinimg.com/564x/d6/f2/8b/d6f28b9a2b8b6795e2c1e593fc451c8d.jpg',
          cover_photo: 'https://images3.alphacoders.com/130/1305748.jpg',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece'
        },
        {
          profile_id: 'p10aya83-9e0c-4864-9115-72345abmla9h',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://static.wikia.nocookie.net/naruto-onepiece-fairytail/images/9/97/Vinsmoke_Sanji.png/revision/latest?cb=20161215200750',
          cover_photo: 'https://images3.alphacoders.com/130/1305748.jpg',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: 'Chân Đen',
          user_id: 'sanji-22c73-f703-4b16-847d-f61bae05-onepiece'
        },
        {
          profile_id: 'j17ana83-9e0c-4864-9115-72345abml1ako',
          phone_number: null,
          date_of_birth: null,
          biography: 'Thành viên băng hải tặc mũ rơm',
          profile_picture:
            'https://static.wikia.nocookie.net/onepiece/images/c/c6/Nami_post_timeskip.jpg/revision/latest?cb=20220425001226&path-prefix=vi',
          cover_photo: 'https://images3.alphacoders.com/130/1305748.jpg',
          home_town: '',
          education: '',
          relationship_status: 2,
          job: '',
          alias: 'Hoa tiêu',
          user_id: 'nami-22c73-f703-4b16-847d-f61bae05-onepiece'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profiles', null, {})
  }
}
