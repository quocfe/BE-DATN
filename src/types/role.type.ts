import { RoletAttributes } from '../db/models/Role'

interface Role extends RoletAttributes {}

export type RoleInput = Pick<Role, 'name' | 'description'>
