import { MessageAttributes } from '../db/models/Message'

export interface Message extends MessageAttributes {
  receiver: string
}

export type MessageInput = Pick<Message, 'body' | 'group_message_id' | 'type'> &
  Partial<Pick<Message, 'receiver'>> & { receiver: string }
export type MessageMediaInput = Pick<Message, 'body' | 'sub_body' | 'group_message_id' | 'type'> &
  Partial<Pick<Message, 'receiver'>> & { receiver?: string }
export type ReplyMessageInput = Pick<Message, 'body' | 'group_message_id' | 'type' | 'parent_id'> &
  Partial<Pick<Message, 'receiver'>> & { receiver: string }
