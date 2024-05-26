import { GroupMessageAttributes } from '../db/models/GroupMessage'

interface GroupMessage extends GroupMessageAttributes {
  list_user: string
}

export type CreateGroupMessageInput = Pick<GroupMessage, 'list_user' | 'group_name' | 'group_thumbnail'>
