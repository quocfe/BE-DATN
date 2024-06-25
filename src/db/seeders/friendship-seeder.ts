import { QueryInterface } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
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
        },
        {
          friendship_id: 'f1a2b3c4-f703-4b16-847d-f61bae05oa2i',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          friend_id: 'chopper-62345-f678-9abc-def01234-onepiece',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'f2a3b4c5-f703-4b16-847d-f61bae05ola9',
          user_id: 'chopper-62345-f678-9abc-def01234-onepiece',
          friend_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'f3a4b5c6-f703-4b16-847d-f61bae05pa3k',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          friend_id: 'franky-82345-f678-9abc-def01234-onepiece',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'f4a5b6c7-f703-4b16-847d-f61bae05qa4l',
          user_id: 'franky-82345-f678-9abc-def01234-onepiece',
          friend_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'f5a6b7c8-f703-4b16-847d-f61bae05ra5m',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          friend_id: 'brook-92345-f678-9abc-def01234-onepiece',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'f6a7b8c9-f703-4b16-847d-f61bae05sa6n',
          user_id: 'brook-92345-f678-9abc-def01234-onepiece',
          friend_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'f7a8b9c0-f703-4b16-847d-f61bae05ta7o',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          friend_id: 'goku-12345-f678-9abc-def01234-dbz',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'f8a9b0c1-f703-4b16-847d-f61bae05ua8p',
          user_id: 'goku-12345-f678-9abc-def01234-dbz',
          friend_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fl0a1b2c3-f703-4b16-847d-f61bae05wa0r',
          user_id: 'vegeta-22345-f678-9abc-def01234-dbz',
          friend_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'f9a0b1c2-f703-4b16-847d-f61bae05va9q',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          friend_id: 'vegeta-22345-f678-9abc-def01234-dbz',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fa1b2c3d-f703-4b16-847d-f61bae05xa1s',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          friend_id: 'gohan-32345-f678-9abc-def01234-dbz',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fb2c3d4e-f703-4b16-847d-f61bae05ya2t',
          user_id: 'gohan-32345-f678-9abc-def01234-dbz',
          friend_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fc3d4e5f-f703-4b16-847d-f61bae05za3u',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          friend_id: 'trunks-42345-f678-9abc-def01234-dbz',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fd4e5f6g-f703-4b16-847d-f61bae05ab4v',
          user_id: 'trunks-42345-f678-9abc-def01234-dbz',
          friend_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fe5f6g7h-f703-4b16-847d-f61bae05bb5w',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          friend_id: 'bulma-52345-f678-9abc-def01234-dbz',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'ff6g7h8i-f703-4b16-847d-f61bae05cb6x',
          user_id: 'bulma-52345-f678-9abc-def01234-dbz',
          friend_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fua0a1b2c3-f703-4b16-847d-f61bae05za4u',
          user_id: 'piccolo-62345-f678-9abc-def01234-dbz',
          friend_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          status: 'Chờ chấp nhận'
        },
        {
          friendship_id: 'fb1b2c3d4-f703-4b16-847d-f61bae05aa5v',
          user_id: 'krillin-72345-f678-9abc-def01234-dbz',
          friend_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          status: 'Chờ chấp nhận'
        },
        {
          friendship_id: 'fc2c3d4e5-f703-4b16-847d-f61bae05bb6w',
          user_id: 'tien-92345-f678-9abc-def01234-dbz',
          friend_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          status: 'Chờ chấp nhận'
        },
        {
          friendship_id: 'fe4e5f6g7-f703-4b16-847d-f61bae05dd8y',
          user_id: 'naruto-12345-f678-9abc-def01234-naruto',
          friend_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          status: 'Chờ chấp nhận'
        },
        {
          friendship_id: 'ff5f6g7h8-f703-4b16-847d-f61bae05ee9z',
          user_id: 'sasuke-22345-f678-9abc-def01234-naruto',
          friend_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          status: 'Chờ chấp nhận'
        },
        {
          friendship_id: 'fa6g7h8i9-f703-4b16-847d-f61bae05fa1u',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          friend_id: 'sakura-32345-f678-9abc-def01234-naruto',
          status: 'Chờ chấp nhận'
        },
        {
          friendship_id: 'fb7h8i9j0-f703-4b16-847d-f61bae05fb2v',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          friend_id: 'kakashi-42345-f678-9abc-def01234-naruto',
          status: 'Chờ chấp nhận'
        },
        {
          friendship_id: 'fc8i9j0k1-f703-4b16-847d-f61bae05fc3w',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          friend_id: 'hinata-52345-f678-9abc-def01234-naruto',
          status: 'Chờ chấp nhận'
        },
        {
          friendship_id: 'fd9j0k1l2-f703-4b16-847d-f61bae05fd4x',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          friend_id: 'gaara-62345-f678-9abc-def01234-naruto',
          status: 'Chờ chấp nhận'
        },
        {
          friendship_id: 'fa0b1c2d3-f703-4b16-847d-f61bae05za4u',
          user_id: 'kakashi-42345-f678-9abc-def01234-naruto',
          friend_id: 'hinata-52345-f678-9abc-def01234-naruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fya1c2d3e4-f703-4b16-847d-f61bae05zb5v',
          user_id: 'hinata-52345-f678-9abc-def01234-naruto',
          friend_id: 'kakashi-42345-f678-9abc-def01234-naruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'f1aa2d3e4f5-f703-4b16-847d-f61bae05zc6w',
          user_id: 'gaara-62345-f678-9abc-def01234-naruto',
          friend_id: 'kakashi-42345-f678-9abc-def01234-naruto',
          status: 'Chờ chấp nhận'
        },
        {
          friendship_id: 'ftea3e4f5g6-f703-4b16-847d-f61bae05zd7x',
          user_id: 'shikamaru-72345-f678-9abc-def01234-naruto',
          friend_id: 'neji-82345-f678-9abc-def01234-naruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fasxa4f5g6h7-f703-4b16-847d-f61bae05ze8y',
          user_id: 'neji-82345-f678-9abc-def01234-naruto',
          friend_id: 'shikamaru-72345-f678-9abc-def01234-naruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fza5g6h7i8-f703-4b16-847d-f61bae05zf9z',
          user_id: 'lee-92345-f678-9abc-def01234-naruto',
          friend_id: 'itachi-102345-f678-9abc-def01234-naruto',
          status: 'Chờ chấp nhận'
        },
        {
          friendship_id: 'fa6sdah7i8j9-f703-4b16-847d-f61bae05zg0a',
          user_id: 'boruto-12345-f678-9abc-def01234-boruto',
          friend_id: 'sarada-22345-f678-9abc-def01234-boruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fa7i8j9ksa0-f703-4b16-847d-f61bae05zh1b',
          user_id: 'sarada-22345-f678-9abc-def01234-boruto',
          friend_id: 'boruto-12345-f678-9abc-def01234-boruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fdsaa8j9k0l1-f703-4b16-847d-f61bae05zi2c',
          user_id: 'mitsuki-32345-f678-9abc-def01234-boruto',
          friend_id: 'kawaki-42345-f678-9abc-def01234-boruto',
          status: 'Chờ chấp nhận'
        },
        {
          friendship_id: 'fa9k0dsl1m2-f703-4b16-847d-f61bae05zj3d',
          user_id: 'shikadai-52345-f678-9abc-def01234-boruto',
          friend_id: 'inojin-62345-f678-9abc-def01234-boruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fb0l1m2n3-f703-4b16-847d-f61sdabae05zk4e',
          user_id: 'inojin-62345-f678-9abc-def01234-boruto',
          friend_id: 'shikadai-52345-f678-9abc-def01234-boruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fb1m2n3o4-f703-4sb16-847d-f61bae05zl5f',
          user_id: 'chocho-72345-f678-9abc-def01234-boruto',
          friend_id: 'metal-82345-f678-9abc-def01234-boruto',
          status: 'Chờ chấp nhận'
        },
        {
          friendship_id: 'fb2n3o4p5-f703-4bdsaA16-847d-f61bae05zm6g',
          user_id: 'sumire-92345-f678-9abc-def01234-boruto',
          friend_id: 'denki-102345-f678-9abc-def01234-boruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fba13o4p5q6-f703-4b16-847d-f61bae05zn7h',
          user_id: 'denki-102345-f678-9abc-def01234-boruto',
          friend_id: 'sumire-92345-f678-9abc-def01234-boruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fb4p5a1q6r7-f703-4b16-847d-f61bae05zo8i',
          user_id: 'ash-12345-f678-9abc-def01234-pokemon',
          friend_id: 'misty-22345-f678-9abc-def01234-pokemon',
          status: 'Chờ chấp nhận'
        },
        {
          friendship_id: 'fa1b2c3d4-f703-4b16-847d-f61bae05za4u',
          user_id: 'sumire-92345-f678-9abc-def01234-boruto',
          friend_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Chờ chấp nhận'
        },
        {
          friendship_id: 'fa0a1b2c3-f703-4b16-847d-f61bae05za4u',
          user_id: 'kakashi-42345-f678-9abc-def01234-naruto',
          friend_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fa1c2d3e4-f703-4b16-847d-f61bae05zb5v',
          user_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          friend_id: 'kakashi-42345-f678-9abc-def01234-naruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fa2d3e4f5-f703-4b16-847d-f61bae05zc6w',
          user_id: 'hinata-52345-f678-9abc-def01234-naruto',
          friend_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fa3e4f5g6-f703-4b16-847d-f61bae05zd7x',
          user_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          friend_id: 'hinata-52345-f678-9abc-def01234-naruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fa4f5g6h7-f703-4b16-847d-f61bae05ze8y',
          user_id: 'gaara-62345-f678-9abc-def01234-naruto',
          friend_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fa5g6h7i8-f703-4b16-847d-f61bae05zf9z',
          user_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          friend_id: 'gaara-62345-f678-9abc-def01234-naruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fa6h7i8j9-f703-4b16-847d-f61bae05zg0a',
          user_id: 'shikamaru-72345-f678-9abc-def01234-naruto',
          friend_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fa7i8j9k0-f703-4b16-847d-f61bae05zh1b',
          user_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          friend_id: 'shikamaru-72345-f678-9abc-def01234-naruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fa8j9k0l1-f703-4b16-847d-f61bae05zi2c',
          user_id: 'neji-82345-f678-9abc-def01234-naruto',
          friend_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fa9k0l1m2-f703-4b16-847d-f61bae05zj3d',
          user_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          friend_id: 'neji-82345-f678-9abc-def01234-naruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fb0l1m2n3-f703-4b16-847d-f61bae05zk4e',
          user_id: 'lee-92345-f678-9abc-def01234-naruto',
          friend_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fb1m2n3o4-f703-4b16-847d-f61bae05zl5f',
          user_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          friend_id: 'lee-92345-f678-9abc-def01234-naruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fb2n3o4p5-f703-4b16-847d-f61bae05zm6g',
          user_id: 'itachi-102345-f678-9abc-def01234-naruto',
          friend_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fb3o4p5q6-f703-4b16-847d-f61bae05zn7h',
          user_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          friend_id: 'itachi-102345-f678-9abc-def01234-naruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fb4p5q6r7-f703-4b16-847d-f61bae05zo8i',
          user_id: 'boruto-12345-f678-9abc-def01234-boruto',
          friend_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fb5q6r7s8-f703-4b16-847d-f61bae05zp9j',
          user_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          friend_id: 'boruto-12345-f678-9abc-def01234-boruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fb6r7s8t9-f703-4b16-847d-f61bae05zq0k',
          user_id: 'sarada-22345-f678-9abc-def01234-boruto',
          friend_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fb7s8t9u0-f703-4b16-847d-f61bae05zr1l',
          user_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          friend_id: 'sarada-22345-f678-9abc-def01234-boruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fb8t9u0v1-f703-4b16-847d-f61bae05zs2m',
          user_id: 'mitsuki-32345-f678-9abc-def01234-boruto',
          friend_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fb9u0v1w2-f703-4b16-847d-f61bae05zt3n',
          user_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          friend_id: 'mitsuki-32345-f678-9abc-def01234-boruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fc0v1w2x3-f703-4b16-847d-f61bae05zu4o',
          user_id: 'kawaki-42345-f678-9abc-def01234-boruto',
          friend_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fc1w2x3y4-f703-4b16-847d-f61bae05zv5p',
          user_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          friend_id: 'kawaki-42345-f678-9abc-def01234-boruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fc2x3y4z5-f703-4b16-847d-f61bae05zw6q',
          user_id: 'shikadai-52345-f678-9abc-def01234-boruto',
          friend_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fc3y4z5a6-f703-4b16-847d-f61bae05zx7r',
          user_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          friend_id: 'shikadai-52345-f678-9abc-def01234-boruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'f1a2b3c4-f703-4b16-847d-f61bae05za4u',
          user_id: 'kakashi-42345-f678-9abc-def01234-naruto',
          friend_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'f2a3b4c5-f703-4b16-847d-f61bae05zb5v',
          user_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          friend_id: 'kakashi-42345-f678-9abc-def01234-naruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'f3a4b5c6-f703-4b16-847d-f61bae05zc6w',
          user_id: 'hinata-52345-f678-9abc-def01234-naruto',
          friend_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'f4a5b6c7-f703-4b16-847d-f61bae05zd7x',
          user_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          friend_id: 'hinata-52345-f678-9abc-def01234-naruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'f5a6b7c8-f703-4b16-847d-f61bae05ze8y',
          user_id: 'gaara-62345-f678-9abc-def01234-naruto',
          friend_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'f6a7b8c9-f703-4b16-847d-f61bae05zf9z',
          user_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          friend_id: 'gaara-62345-f678-9abc-def01234-naruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'f7a8b9c0-f703-4b16-847d-f61bae05zg0a',
          user_id: 'shikamaru-72345-f678-9abc-def01234-naruto',
          friend_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'f8a9b0c1-f703-4b16-847d-f61bae05zh1b',
          user_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          friend_id: 'shikamaru-72345-f678-9abc-def01234-naruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'f9a0b1c2-f703-4b16-847d-f61bae05zi2c',
          user_id: 'neji-82345-f678-9abc-def01234-naruto',
          friend_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'f0a1b2c3-f703-4b16-847d-f61bae05zj3d',
          user_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          friend_id: 'neji-82345-f678-9abc-def01234-naruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fa1b2c3d4-f703-4b16-847d-f61bae05zk4e',
          user_id: 'lee-92345-f678-9abc-def01234-naruto',
          friend_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fb2c3d4e5-f703-4b16-847d-f61bae05zl5f',
          user_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          friend_id: 'lee-92345-f678-9abc-def01234-naruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fc3d4e5f6-f703-4b16-847d-f61bae05zm6g',
          user_id: 'itachi-102345-f678-9abc-def01234-naruto',
          friend_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fd4e5f6g7-f703-4b16-847d-f61bae05zn7h',
          user_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          friend_id: 'itachi-102345-f678-9abc-def01234-naruto',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'fd1m2n3o4-f703-4b16-847d-f61bae05zv4o',
          user_id: 'kawaki-42345-f678-9abc-def01234-boruto',
          friend_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Chờ chấp nhận'
        },
        {
          friendship_id: 'fd2n3o4p5-f703-4b16-847d-f61bae05zw5p',
          user_id: 'shikadai-52345-f678-9abc-def01234-boruto',
          friend_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Chờ chấp nhận'
        },
        {
          friendship_id: 'fd3o4p5q6-f703-4b16-847d-f61bae05zx6q',
          user_id: 'inojin-62345-f678-9abc-def01234-boruto',
          friend_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Chờ chấp nhận'
        },
        {
          friendship_id: 'fd4p5q6r7-f703-4b16-847d-f61bae05zy7r',
          user_id: 'chocho-72345-f678-9abc-def01234-boruto',
          friend_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Chờ chấp nhận'
        },
        {
          friendship_id: 'fd5q6r7s8-f703-4b16-847d-f61bae05zz8s',
          user_id: 'metal-82345-f678-9abc-def01234-boruto',
          friend_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Chờ chấp nhận'
        },
        {
          friendship_id: 'fd6r7s8t9-f703-4b16-847d-f61bae05aa9t',
          user_id: 'sumire-92345-f678-9abc-def01234-boruto',
          friend_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Chờ chấp nhận'
        },
        {
          friendship_id: 'fd7s8t9u0-f703-4b16-847d-f61bae05ab0u',
          user_id: 'denki-102345-f678-9abc-def01234-boruto',
          friend_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Chờ chấp nhận'
        },
        {
          friendship_id: 'fd8t9u0v1-f703-4b16-847d-f61bae05ac1v',
          user_id: 'ash-12345-f678-9abc-def01234-pokemon',
          friend_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Chờ chấp nhận'
        },
        {
          friendship_id: 'fd9u0v1w2-f703-4b16-847d-f61bae05ad2w',
          user_id: 'misty-22345-f678-9abc-def01234-pokemon',
          friend_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Chờ chấp nhận'
        },
        {
          friendship_id: 'fa7g8h9i0-f703-4b16-847d-f61bae05zg0a',
          user_id: 'misty-22345-f678-9abc-def01234-pokemon',
          friend_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Chờ chấp nhận'
        },
        {
          friendship_id: 'fa5e6f7g8-f703-4b16-847d-f61bae05ze8y',
          user_id: 'ash-12345-f678-9abc-def01234-pokemon',
          friend_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Chờ chấp nhận'
        },
        {
          friendship_id: 'fbu12c3d4e5-f703-4b16-847d-f61bae05zl5f',
          user_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          friend_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          status: 'Đã chấp nhận'
        },
        {
          friendship_id: 'pao12u12c3d4e5-f703-4b16-847d-f61bae05zl5f',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          friend_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          status: 'Đã chấp nhận'
        }
      ],
      {}
    )
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('Friendships', {}, {})
  }
}
