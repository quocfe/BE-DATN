import { PostAttributes } from '../db/models/Post'

interface Post extends PostAttributes {}

export type PostInput = Omit<Post, 'post_id' | 'user_id' | 'createdAt' | 'updatedAt'>
