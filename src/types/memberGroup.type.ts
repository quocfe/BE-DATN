import { MemberGroupAttributes } from '../db/models/MemberGroup'

interface MemberGroup extends MemberGroupAttributes {
  listUser: string
}

export type CreateMemberGroupInput = Pick<MemberGroup, 'listUser' | 'group_message_id'>
