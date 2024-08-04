import { PostCommentReplyAttributes } from '../db/models/PostCommentReply'

interface PostComment extends PostCommentReplyAttributes {}

export type PostCommentReplyInput = Pick<PostComment, 'content' | 'media_url' | 'replied_to_user_id'>
