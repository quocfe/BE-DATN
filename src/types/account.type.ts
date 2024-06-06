import { AccountAttributes } from '../db/models/Account'

export interface Account extends AccountAttributes {}

export type AccountOuput = Pick<Account, 'account_id' | 'email' | 'role_id' | 'username'>
