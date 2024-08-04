import { PostCommentAttributes } from '../db/models/PostComment'

interface PostComment extends PostCommentAttributes {}

export type PostCommentType = 'text' | 'media'

export type PostCommentInput = Pick<PostComment, 'content' | 'media_url'>
