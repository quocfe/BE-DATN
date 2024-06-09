import { ReactMessageAttributes } from '../db/models/ReactMessage'

export interface ReactMessage extends ReactMessageAttributes {}

export type ReactMessageInput = Pick<ReactMessage, 'message_id' | 'user_id' | 'emoji' | 'createdBy'> & {
  receiver: string
}
export type UpdateReactMessageInput = Pick<
  ReactMessage,
  'react_message_id' | 'user_id' | 'emoji' | 'createdBy' | 'updatedAt'
>
