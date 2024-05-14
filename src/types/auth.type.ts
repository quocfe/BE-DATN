import { User } from './user.type'

export type LoginInput = Pick<User, 'email' | 'password'>

export type RegisterInput = Pick<User, 'first_name' | 'last_name' | 'email' | 'password'>
