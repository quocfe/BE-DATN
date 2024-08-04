const V1 = '/api/v1'
const V2 = '/api/v2'

const API_V1 = {
  common: `${V1}`,
  user: `${V1}/user`,
  interest: `${V1}/interest`,
  story: `${V1}/story`,
  message: `${V1}/message`,
  notifymessage: `${V1}/notify`,
  post: `${V1}/post`,
  post_comment: `${V1}/post_comment`,
  post_comment_reply: `${V1}/post_comment_reply`,
  post_reaction: `${V1}/post_reaction`,
  role: `${V1}/role`,
  fanpage: `${V1}/fanpage`,
  permission: `${V1}/permission`,
  account: `${V1}/account`,
  module: `${V1}/module`,
  videos: `${V1}/videos`,
  likeVideo: `${V1}/like-video`,
  commentVideo: `${V1}/comment-video`,
  favoriteVideo: `${V1}/favorite-video`,
  reportVideo: `${V1}/report-video`
} as const

const API_V2 = {
  example: `${V2}/example`
} as const

export { API_V1, API_V2 }
