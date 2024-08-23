import { MessageAttributes } from '../db/models/Message'

export interface Message extends MessageAttributes {
  receiver: string
  sender: string
}

export type MessageInput = Pick<Message, 'body' | 'group_message_id' | 'type' | 'is_report' | 'report_count'> &
  Partial<Pick<Message, 'receiver'>> & { receiver: string } & Partial<Pick<Message, 'sender'>> & { sender?: string }

export type MessageMediaInput = Pick<
  Message,
  'body' | 'sub_body' | 'group_message_id' | 'type' | 'is_report' | 'report_count'
> &
  Partial<Pick<Message, 'receiver'>> & { receiver?: string }
export type ReplyMessageInput = Pick<
  Message,
  'body' | 'group_message_id' | 'type' | 'parent_id' | 'is_report' | 'report_count'
> &
  Partial<Pick<Message, 'receiver'>> & { receiver: string }
