'use strict'
/** @type {import('sequelize-cli').Migration} */
const { hashSync, genSaltSync } = require('bcryptjs')
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          first_name: 'Kan',
          last_name: 'Kan',
          email: 'kanisdev@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 0,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          first_name: 'Luffy',
          last_name: 'Monkey D',
          email: 'luffy@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 0,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          first_name: 'Zoro',
          last_name: 'Roronoa',
          email: 'zoro@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 0,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'sanji-22c73-f703-4b16-847d-f61bae05-onepiece',
          first_name: 'Sanji',
          last_name: 'Vinsmoke',
          email: 'sanji@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 0,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'nami-22c73-f703-4b16-847d-f61bae05-onepiece',
          first_name: 'Nami',
          last_name: 'Rico',
          email: 'nami@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'usopp-22c73-f703-4b16-847d-f61bae05-onepiece',
          first_name: 'Usopp',
          last_name: 'God',
          email: 'usopp@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'robin-22c73-f703-4b16-847d-f61bae05-onepiece',
          first_name: 'Robin',
          last_name: 'Nico',
          email: 'robin@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 2,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'jinbei-22c73-f703-4b16-847d-f61bae05-onepiece',
          first_name: 'Jinbei',
          last_name: 'Monkey',
          email: 'jinbei@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'akainu-22c73-f703-4b16-847d-f61bae05-onepiece',
          first_name: 'Akainu',
          last_name: 'Sakazuki',
          email: 'akainu@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'chopper-62345-f678-9abc-def01234-onepiece',
          first_name: 'Chopper',
          last_name: 'Tony Tony',
          email: 'chopper@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'franky-82345-f678-9abc-def01234-onepiece',
          first_name: 'Franky',
          last_name: '',
          email: 'franky@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'brook-92345-f678-9abc-def01234-onepiece',
          first_name: 'Brook',
          last_name: '',
          email: 'brook@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'goku-12345-f678-9abc-def01234-dbz',
          first_name: 'Goku',
          last_name: 'Son',
          email: 'goku@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'vegeta-22345-f678-9abc-def01234-dbz',
          first_name: 'Vegeta',
          last_name: '',
          email: 'vegeta@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'gohan-32345-f678-9abc-def01234-dbz',
          first_name: 'Gohan',
          last_name: 'Son',
          email: 'gohan@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'trunks-42345-f678-9abc-def01234-dbz',
          first_name: 'Trunks',
          last_name: '',
          email: 'trunks@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'bulma-52345-f678-9abc-def01234-dbz',
          first_name: 'Bulma',
          last_name: '',
          email: 'bulma@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 0,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'piccolo-62345-f678-9abc-def01234-dbz',
          first_name: 'Piccolo',
          last_name: '',
          email: 'piccolo@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'krillin-72345-f678-9abc-def01234-dbz',
          first_name: 'Krillin',
          last_name: '',
          email: 'krillin@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'tien-92345-f678-9abc-def01234-dbz',
          first_name: 'Tien',
          last_name: 'Shinhan',
          email: 'tien@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'roshi-102345-f678-9abc-def01234-dbz',
          first_name: 'Roshi',
          last_name: 'Master',
          email: 'roshi@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'naruto-12345-f678-9abc-def01234-naruto',
          first_name: 'Naruto',
          last_name: 'Uzumaki',
          email: 'naruto@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'sasuke-22345-f678-9abc-def01234-naruto',
          first_name: 'Sasuke',
          last_name: 'Uchiha',
          email: 'sasuke@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'sakura-32345-f678-9abc-def01234-naruto',
          first_name: 'Sakura',
          last_name: 'Haruno',
          email: 'sakura@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 0,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'kakashi-42345-f678-9abc-def01234-naruto',
          first_name: 'Kakashi',
          last_name: 'Hatake',
          email: 'kakashi@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'hinata-52345-f678-9abc-def01234-naruto',
          first_name: 'Hinata',
          last_name: 'Hyuga',
          email: 'hinata@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 0,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'gaara-62345-f678-9abc-def01234-naruto',
          first_name: 'Gaara',
          last_name: '',
          email: 'gaara@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'shikamaru-72345-f678-9abc-def01234-naruto',
          first_name: 'Shikamaru',
          last_name: 'Nara',
          email: 'shikamaru@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'neji-82345-f678-9abc-def01234-naruto',
          first_name: 'Neji',
          last_name: 'Hyuga',
          email: 'neji@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'lee-92345-f678-9abc-def01234-naruto',
          first_name: 'Rock',
          last_name: 'Lee',
          email: 'lee@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'itachi-102345-f678-9abc-def01234-naruto',
          first_name: 'Itachi',
          last_name: 'Uchiha',
          email: 'itachi@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'boruto-12345-f678-9abc-def01234-boruto',
          first_name: 'Boruto',
          last_name: 'Uzumaki',
          email: 'boruto@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'sarada-22345-f678-9abc-def01234-boruto',
          first_name: 'Sarada',
          last_name: 'Uchiha',
          email: 'sarada@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 0,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'mitsuki-32345-f678-9abc-def01234-boruto',
          first_name: 'Mitsuki',
          last_name: '',
          email: 'mitsuki@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'kawaki-42345-f678-9abc-def01234-boruto',
          first_name: 'Kawaki',
          last_name: '',
          email: 'kawaki@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'shikadai-52345-f678-9abc-def01234-boruto',
          first_name: 'Shikadai',
          last_name: 'Nara',
          email: 'shikadai@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'inojin-62345-f678-9abc-def01234-boruto',
          first_name: 'Inojin',
          last_name: 'Yamanaka',
          email: 'inojin@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'chocho-72345-f678-9abc-def01234-boruto',
          first_name: 'Chocho',
          last_name: 'Akimichi',
          email: 'chocho@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 0,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'metal-82345-f678-9abc-def01234-boruto',
          first_name: 'Metal',
          last_name: 'Lee',
          email: 'metal@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'sumire-92345-f678-9abc-def01234-boruto',
          first_name: 'Sumire',
          last_name: 'Kakei',
          email: 'sumire@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 0,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'denki-102345-f678-9abc-def01234-boruto',
          first_name: 'Denki',
          last_name: 'Kaminarimon',
          email: 'denki@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'ash-12345-f678-9abc-def01234-pokemon',
          first_name: 'Ash',
          last_name: 'Ketchum',
          email: 'ash@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 1,
          code: '',
          is_auth: true,
          expires: ''
        },
        {
          user_id: 'misty-22345-f678-9abc-def01234-pokemon',
          first_name: 'Misty',
          last_name: '',
          email: 'misty@gmail.com',
          password: hashSync('123456', genSaltSync(10)),
          gender: 0,
          code: '',
          is_auth: true,
          expires: ''
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
