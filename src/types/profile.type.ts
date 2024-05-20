import { ProfileAttributes } from '../db/models/Profile'

interface Profile extends ProfileAttributes {}

export type ProfileInput = Partial<Omit<Profile, 'user_id' | 'createdAt' | 'updatedAt'>> & {
  interestIds?: string[]
}
