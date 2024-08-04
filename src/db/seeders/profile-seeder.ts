import { QueryInterface } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
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
        },
        {
          profile_id: 'vsu1na83-9e0c-4864-9115-72345abml1i19',
          phone_number: null,
          date_of_birth: null,
          biography: 'Thành viên băng hải tặc mũ rơm',
          profile_picture:
            'https://imgix.ranker.com/user_node_img/50088/1001742935/original/a-dumbass-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=375',
          cover_photo: 'https://images3.alphacoders.com/130/1305748.jpg',
          home_town: '',
          education: '',
          relationship_status: 3,
          job: '',
          alias: 'Bắn tỉa',
          user_id: 'usopp-22c73-f703-4b16-847d-f61bae05-onepiece'
        },
        {
          profile_id: 'x31mla83-9e0c-4864-9115-72345abml1iu71s',
          phone_number: null,
          date_of_birth: null,
          biography: 'Thành viên băng hải tặc mũ rơm',
          profile_picture: 'https://d1j8r0kxyu9tj8.cloudfront.net/files/1625905500zZGRYKFZHWjR4JG.jpg',
          cover_photo: 'https://images3.alphacoders.com/130/1305748.jpg',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: 'Nhà khảo cổ',
          user_id: 'robin-22c73-f703-4b16-847d-f61bae05-onepiece'
        },
        {
          profile_id: '1yau18-9e0c-4864-9115-72345abml1iu71s',
          phone_number: null,
          date_of_birth: null,
          biography: 'Thành viên băng hải tặc mũ rơm',
          profile_picture: 'https://i.pinimg.com/736x/d0/d5/91/d0d59102cf996bdd113c54019099fea1.jpg',
          cover_photo: 'https://images3.alphacoders.com/130/1305748.jpg',
          home_town: '',
          education: '',
          relationship_status: 3,
          job: '',
          alias: 'Người cá',
          user_id: 'jinbei-22c73-f703-4b16-847d-f61bae05-onepiece'
        },
        {
          profile_id: '2da1la83-9e0c-4864-9115-72345abml1iudaski',
          phone_number: null,
          date_of_birth: null,
          biography: 'Lực lượng nòng cốt hải quân',
          profile_picture:
            'https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/09/Sakazuki---One-Piece.png',
          cover_photo: 'https://images3.alphacoders.com/130/1305748.jpg',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: 'Thủy sư',
          user_id: 'akainu-22c73-f703-4b16-847d-f61bae05-onepiece'
        },
        {
          profile_id: '687g8h9i-0j1a-2b3c-4d5e-6f7g8h9i0j1k',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture: 'https://i.pinimg.com/736x/45/7c/9f/457c9fbd14dd0a383cc18a215e3ac757.jpg',
          cover_photo:
            'https://static.vecteezy.com/system/resources/previews/006/852/817/non_2x/abstract-colorful-gradient-lines-with-blue-and-pink-light-on-purple-background-free-vector.jpg',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'chopper-62345-f678-9abc-def01234-onepiece'
        },
        {
          profile_id: '8h9i0j1k-2a3b-4c5d-6e7f-8g9h0i1j2k3l',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture: 'https://genk.mediacdn.vn/2018/8/20/anh-2-15347597050251195374038.png',
          cover_photo:
            'https://static.vecteezy.com/system/resources/previews/006/852/817/non_2x/abstract-colorful-gradient-lines-with-blue-and-pink-light-on-purple-background-free-vector.jpg',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'franky-82345-f678-9abc-def01234-onepiece'
        },
        {
          profile_id: 'a9i0j1k2a-3b4c-5d6e-7f8g-9h0i1j2k3l4m',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPAoNuE09yY018LLj7uJKTkbLXyMrzVvO13Q&s',
          cover_photo:
            'https://static.vecteezy.com/system/resources/previews/006/852/817/non_2x/abstract-colorful-gradient-lines-with-blue-and-pink-light-on-purple-background-free-vector.jpg',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'brook-92345-f678-9abc-def01234-onepiece'
        },
        {
          profile_id: 'x1b2c3d4e-5f6a-7b8c-9d0e-1f2g3h4i5j6k',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://img.asmedia.epimg.net/resizer/v2/L726G3JR35DGLG6JBDOS4MAPQ4.jpg?auth=dad1e99790069012ff7798d8442f8dc34f2a5c78bd18bb61151178c0c960e965&width=1472&height=1104&smart=true',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'goku-12345-f678-9abc-def01234-dbz'
        },
        {
          profile_id: 'j2b3c4d5e-6f7a-8b9c-0d1e-2f3g4h5i6j7k',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture: 'https://miro.medium.com/v2/resize:fit:636/1*Z14pvsjLwMRE0KV2HhU_LA.png',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'vegeta-22345-f678-9abc-def01234-dbz'
        },
        {
          profile_id: 'y3c4d5e6f-7g8a-9b0c-1d2e-3f4g5h6i7j8k',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture: 'https://i.pinimg.com/736x/25/de/da/25deda5c58fa63ef6686c560bf81107f.jpg',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'gohan-32345-f678-9abc-def01234-dbz'
        },
        {
          profile_id: 'z4d5e6f7g-8h9a-0b1c-2d3e-4f5g6h7i8j9k',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture: 'https://avatarfiles.alphacoders.com/229/thumb-350-229939.webp',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'trunks-42345-f678-9abc-def01234-dbz'
        },
        {
          profile_id: '5ie6f7g8h-9i0a-1b2c-3d4e-5f6g7h8i9j0k',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture: 'https://i.pinimg.com/736x/5d/9b/35/5d9b35fb682fc2167eb3a80d5262b111.jpg',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'bulma-52345-f678-9abc-def01234-dbz'
        },
        {
          profile_id: '697g8h9i-0j1a-2b3c-4d5e-6f7g8h9i0j1k',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502886/default/trend-avatar-vo-danh-1_mbuagm.jpg',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'piccolo-62345-f678-9abc-def01234-dbz'
        },
        {
          profile_id: '7xg8h9i0j-1k2a-3b4c-5d6e-7f8g9h0i1j2k',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502886/default/trend-avatar-vo-danh-1_mbuagm.jpg',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'krillin-72345-f678-9abc-def01234-dbz'
        },
        {
          profile_id: '9i0j1k2a-3b4c-5d6e-7f8g-9h0i1j2k3l4m',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502886/default/trend-avatar-vo-danh-1_mbuagm.jpg',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'tien-92345-f678-9abc-def01234-dbz'
        },
        {
          profile_id: '0j1k2a3b-4c5d-6e7f-8g9h-0i1j2k3l4m5n',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502886/default/trend-avatar-vo-danh-1_mbuagm.jpg',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'roshi-102345-f678-9abc-def01234-dbz'
        },
        {
          profile_id: '1b2c3d4e-5f6a-7b8c-9d0e-1f2g3h4i5j6k',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502886/default/trend-avatar-vo-danh-1_mbuagm.jpg',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'naruto-12345-f678-9abc-def01234-naruto'
        },
        {
          profile_id: '2b3c4d5e-6f7a-8b9c-0d1e-2f3g4h5i6j7k',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502886/default/trend-avatar-vo-danh-1_mbuagm.jpg',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'sasuke-22345-f678-9abc-def01234-naruto'
        },
        {
          profile_id: 'x3c4d5e6f-7g8a-9b0c-1d2e-3f4g5h6i7j8k',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502886/default/trend-avatar-vo-danh-1_mbuagm.jpg',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'sakura-32345-f678-9abc-def01234-naruto'
        },
        {
          profile_id: '4d5e6f7g-8h9a-0b1c-2d3e-4f5g6h7i8j9k',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502886/default/trend-avatar-vo-danh-1_mbuagm.jpg',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'kakashi-42345-f678-9abc-def01234-naruto'
        },
        {
          profile_id: '5e6f7g8h-9i0a-1b2c-3d4e-5f6g7h8i9j0k',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502886/default/trend-avatar-vo-danh-1_mbuagm.jpg',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'hinata-52345-f678-9abc-def01234-naruto'
        },
        {
          profile_id: '6f7g8h9i-0j1a-2b3c-4d5e-6f7g8h9i0j1k',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://preview.redd.it/where-do-you-think-gaara-would-be-if-he-stayed-evil-what-v0-1mc4ko3vkdmc1.jpeg?auto=webp&s=dcbab387f9a94ab3cd66e2d7601040b215b03b31',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'gaara-62345-f678-9abc-def01234-naruto'
        },
        {
          profile_id: '7g8h9i0j-1k2a-3b4c-5d6e-7f8g9h0i1j2k',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502886/default/trend-avatar-vo-danh-1_mbuagm.jpg',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'shikamaru-72345-f678-9abc-def01234-naruto'
        },
        {
          profile_id: '8ioh9i0j1k-2a3b-4c5d-6e7f-8g9h0i1j2k3l',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502886/default/trend-avatar-vo-danh-1_mbuagm.jpg',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'neji-82345-f678-9abc-def01234-naruto'
        },
        {
          profile_id: '9io0j1k2a-3b4c-5d6e-7f8g-9h0i1j2k3l4m',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502886/default/trend-avatar-vo-danh-1_mbuagm.jpg',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'lee-92345-f678-9abc-def01234-naruto'
        },
        {
          profile_id: 'xi0j1k2a3b-4c5d-6e7f-8g9h-0i1j2k3l4m5n',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502886/default/trend-avatar-vo-danh-1_mbuagm.jpg',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'itachi-102345-f678-9abc-def01234-naruto'
        },
        {
          profile_id: 'ui1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502886/default/trend-avatar-vo-danh-1_mbuagm.jpg',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'boruto-12345-f678-9abc-def01234-boruto'
        },
        {
          profile_id: 'ip2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502886/default/trend-avatar-vo-danh-1_mbuagm.jpg',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'sarada-22345-f678-9abc-def01234-boruto'
        },
        {
          profile_id: '3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502886/default/trend-avatar-vo-danh-1_mbuagm.jpg',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'mitsuki-32345-f678-9abc-def01234-boruto'
        },
        {
          profile_id: '4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502886/default/trend-avatar-vo-danh-1_mbuagm.jpg',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'kawaki-42345-f678-9abc-def01234-boruto'
        },
        {
          profile_id: '5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502886/default/trend-avatar-vo-danh-1_mbuagm.jpg',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'shikadai-52345-f678-9abc-def01234-boruto'
        },
        {
          profile_id: '6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502886/default/trend-avatar-vo-danh-1_mbuagm.jpg',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'inojin-62345-f678-9abc-def01234-boruto'
        },
        {
          profile_id: '7g8h9i0j-1k2l-3m4n-5o6p-7q8r9s0t1u2v',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502886/default/trend-avatar-vo-danh-1_mbuagm.jpg',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'chocho-72345-f678-9abc-def01234-boruto'
        },
        {
          profile_id: '8h9i0j1k-2l3m-4n5o-6p7q-8r9s0t1u2v3w',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502886/default/trend-avatar-vo-danh-1_mbuagm.jpg',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'metal-82345-f678-9abc-def01234-boruto'
        },
        {
          profile_id: '9i0j1k2l-3m4n-5o6p-7q8r-9s0t1u2v3w4x',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502886/default/trend-avatar-vo-danh-1_mbuagm.jpg',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'sumire-92345-f678-9abc-def01234-boruto'
        },
        {
          profile_id: '0j1k2l3m-4n5o-6p7q-8r9s-0t1u2v3w4x5y',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502886/default/trend-avatar-vo-danh-1_mbuagm.jpg',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'denki-102345-f678-9abc-def01234-boruto'
        },
        {
          profile_id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502886/default/trend-avatar-vo-danh-1_mbuagm.jpg',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'ash-12345-f678-9abc-def01234-pokemon'
        },
        {
          profile_id: '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q',
          phone_number: null,
          date_of_birth: null,
          biography: '',
          profile_picture:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502886/default/trend-avatar-vo-danh-1_mbuagm.jpg',
          cover_photo:
            'https://res.cloudinary.com/dswainylr/image/upload/v1718502953/default/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover_ryhwfy.webp',
          home_town: '',
          education: '',
          relationship_status: 1,
          job: '',
          alias: '',
          user_id: 'misty-22345-f678-9abc-def01234-pokemon'
        }
      ],
      {}
    )
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('Profiles', {}, {})
  }
}
