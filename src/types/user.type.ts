import { UserAttributes } from '../db/models/User'

export interface User extends UserAttributes {}

export type UserOutput = Omit<User, 'password' | 'code' | 'is_auth' | 'expires'>
