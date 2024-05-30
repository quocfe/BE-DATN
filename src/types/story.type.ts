import { StoryAttributes } from '../db/models/Story'

export interface Story extends StoryAttributes {}

export type StoryInput = Omit<Story, 'story_id' |'user_id'| 'createdAt' | 'updatedAt'>

export type StoryUpdate = Omit<Story, 'story_id' |'user_id'|'story_time'|'createdAt' | 'updatedAt' >
