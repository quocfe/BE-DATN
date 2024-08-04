import { AccountAttributes } from '../db/models/Account'

export interface Account extends AccountAttributes {}

export type AccountUpdate = {
  user?: {
    username?: string
    phone?: string
    address?: string
    role_id?: string
    status?: string
  }
  modules?: {
    name?: string
    permissions?: {
      name?: string
    }[]
  }[]
}

export type ProfileInput = Partial<Pick<Account, 'username' | 'phone_number' | 'address' | 'role_id' | 'status'>> & {
  interestIds?: string[]
}

export type AccountOuput = Pick<Account, 'account_id' | 'email' | 'username'> & {
  role?: {
    name: string
  }
  modules: Module[]
}

export type Permission = {
  permission_id: string
  name: string
}

export type Module = {
  module_id: string
  name: string
  permissions: Permission[]
  account_permissions: Permission[]
}
