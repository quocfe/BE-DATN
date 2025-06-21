import { PostAttributes } from '../db/models/Post'

export interface Post extends PostAttributes {}

export type PostInput = Omit<Post, 'post_id' | 'user_id' | 'fanpage_id' | 'createdAt' | 'updatedAt'> & {
  fanpage_id?: string
}

export type PostUpdate = Partial<PostInput>
