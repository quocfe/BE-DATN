import { GroupMessageAttributes } from '../db/models/GroupMessage'
import Message from '../db/models/Message'

interface GroupMessage extends GroupMessageAttributes {
  list_user: string
}
export type ConvesationSideBar = GroupMessage & {
  messages?: Message
}
export type CreateGroupMessageInput = Pick<GroupMessage, 'list_user' | 'group_name' | 'group_thumbnail'>
