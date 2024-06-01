import { MessageAttributes } from '../db/models/Message'

interface Message extends MessageAttributes {
  receiver: string
}

export type MessageInput = Pick<Message, 'body' | 'group_message_id' | 'receiver' | 'type'>
export type ReplyMessageInput = Pick<Message, 'body' | 'group_message_id' | 'type' | 'parent_id'>
