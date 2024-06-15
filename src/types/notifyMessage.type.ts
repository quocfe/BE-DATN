import { NotifyGroupMessageAttributes } from '../db/models/NotifyGroupMessage'

export interface NotifyMessage extends NotifyGroupMessageAttributes {}

export type NotifyGroupMessageInput = Pick<NotifyMessage, 'group_message_id' | 'content' | 'type'>
