import { body } from 'express-validator'
import PRIVACY from '../../constants/video'

const createVideoValidator = [
  body('content').isEmpty().default(''),
  // body('title').isEmpty().default(''),
  body('tag').isEmpty().default(''),
  body('privacy').isString().isIn([PRIVACY.ALL, PRIVACY.FRIEND, PRIVACY.ONLY]).withMessage('Privacy không hợp lệ')
]

export { createVideoValidator }
