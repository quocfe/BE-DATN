import { PostReactionAttributes } from '../db/models/PostReaction'

interface PostReaction extends PostReactionAttributes {}

export type PostReactionInput = Pick<PostReaction, 'type'>
