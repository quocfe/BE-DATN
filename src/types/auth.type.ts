import { User } from './user.type'

export type LoginInput = {
  email: string
  password: string
}

export type RegisterInput = Pick<User, 'first_name' | 'last_name' | 'email' | 'password' | 'gender'>
