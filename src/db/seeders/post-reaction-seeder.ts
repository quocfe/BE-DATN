import { QueryInterface } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      'PostReactions',
      [
        {
          post_reaction_id: 'eb28cd1-8ed1-4f1e-b369-3378546c2e601',
          post_id: '397236d5-0097-4ade-845f-24e429ef0e01',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          type: 'love'
        },
        {
          post_reaction_id: 'eb28cd1-8ed1-4f1e-b369-3378546c2e602',
          post_id: '397236d5-0097-4ade-845f-24e429ef0e01',
          user_id: 'luffy-22c73-f703-4b16-847d-f61bae05-onepiece',
          type: 'love'
        },
        {
          post_reaction_id: 'eb28cd1-8ed1-4f1e-b369-3378546c2e603',
          post_id: '397236d5-0097-4ade-845f-24e429ef0e01',
          user_id: 'zoro-22c73-f703-4b16-847d-f61bae05-onepiece',
          type: 'haha'
        },
        {
          post_reaction_id: 'eb28cd1-8ed1-4f1e-b369-3378546c2e604',
          post_id: '397236d5-0097-4ade-845f-24e429ef0e01',
          user_id: 'sanji-22c73-f703-4b16-847d-f61bae05-onepiece',
          type: 'sad'
        },
        {
          post_reaction_id: 'eb28cd1-8ed1-4f1e-b369-3378546c2e605',
          post_id: '397236d5-0097-4ade-845f-24e429ef0e01',
          user_id: 'nami-22c73-f703-4b16-847d-f61bae05-onepiece',
          type: 'love'
        },
        {
          post_reaction_id: 'eb28cd1-8ed1-4f1e-b369-3378546c2e606',
          post_id: '397236d5-0097-4ade-845f-24e429ef0e01',
          user_id: 'usopp-22c73-f703-4b16-847d-f61bae05-onepiece',
          type: 'like'
        },
        {
          post_reaction_id: 'eb28cd1-8ed1-4f1e-b369-3378546c2e607',
          post_id: '397236d5-0097-4ade-845f-24e429ef0e01',
          user_id: 'robin-22c73-f703-4b16-847d-f61bae05-onepiece',
          type: 'love'
        },
        {
          post_reaction_id: 'eb28cd1-8ed1-4f1e-b369-3378546c2e608',
          post_id: '397236d5-0097-4ade-845f-24e429ef0e01',
          user_id: 'jinbei-22c73-f703-4b16-847d-f61bae05-onepiece',
          type: 'haha'
        },
        {
          post_reaction_id: 'eb28cd1-8ed1-4f1e-b369-3378546c2e609',
          post_id: '397236d5-0097-4ade-845f-24e429ef0e01',
          user_id: 'akainu-22c73-f703-4b16-847d-f61bae05-onepiece',
          type: 'like'
        },
        {
          post_reaction_id: 'e1b28cd1-8ed1-4f1e-b369-3378546c2e612',
          post_id: '397236d5-0097-4ade-845f-24e429ef0e02',
          user_id: 'akainu-22c73-f703-4b16-847d-f61bae05-onepiece',
          type: 'haha'
        },
        {
          post_reaction_id: 'eio1b28cd1-8ed1-4f1e-b369-3378546c2e1a',
          post_id: '397236d5-0097-4ade-845f-24e429ef0e02',
          user_id: 'kanisdev-22c73-f703-4b16-847d-f61bae05-2002',
          type: 'haha'
        }
      ],
      {}
    )
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('PostReactions', {}, {})
  }
}
