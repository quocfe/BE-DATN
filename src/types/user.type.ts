import { UserAttributes } from '../db/models/User'
import { Permission } from './account.type'
import { Modules } from './module.type'

export interface User extends UserAttributes {}

export type UserOutput = {
  user_id: string
  email: string
  role?: {
    name: string
    description: string
  }
  modules?: Modules
}

export type Profile = {
  profile_id: string
  phone_number: null
  date_of_birth: null
  biography: string
  profile_picture: string
  cover_photo: string
  home_town: string
  education: string
  job: string
  alias: string
  user_id: string
}

export type ChangePassword = {
  old_password: string
  new_password: string
}
