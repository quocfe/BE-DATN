const V1 = '/api/v1'
const V2 = '/api/v2'

const API_V1 = {
  common: `${V1}`,
  user: `${V1}/user`,
  interest: `${V1}/interest`,
  post: `${V1}/post`,
  post_comment: `${V1}/post_comment`,
  post_comment_reply: `${V1}/post_comment_reply`,
  post_reaction: `${V1}/post_reaction`,
  role: `${V1}/role`,
  permission: `${V1}/permission`,
  account: `${V1}/account`,
  module: `${V1}/module`
} as const

const API_V2 = {
  example: `${V2}/example`
} as const

export { API_V1, API_V2 }
