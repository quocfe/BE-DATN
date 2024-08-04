import Permission from '../db/models/Permission'

interface Module {
  module_id: string
  name: string
  permissions: Permission[]
  account_permissions: Permission[]
}

export type Modules = Module[]
