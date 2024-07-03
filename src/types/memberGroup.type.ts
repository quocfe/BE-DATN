import { MemberGroupAttributes } from '../db/models/MemberGroup'

interface MemberGroup extends MemberGroupAttributes {
  list_user: string
}

export type CreateMemberGroupInput = Pick<MemberGroup, 'list_user' | 'group_message_id'>
