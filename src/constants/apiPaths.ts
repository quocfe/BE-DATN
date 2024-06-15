const V1 = '/api/v1'
const V2 = '/api/v2'

const API_V1 = {
  common: `${V1}`,
  user: `${V1}/user`,
  interest: `${V1}/interest`,
  message: `${V1}/message`,
  notifymessage: `${V1}/notify`
} as const

const API_V2 = {
  example: `${V2}/example`
} as const

export { API_V1, API_V2 }
