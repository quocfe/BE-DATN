import { NextFunction, Request, Response } from 'express'
import messageService from '../services/messageService'
import { CreateGroupMessageInput } from '../types/groupMessage.type'
import { CreateMemberGroupInput } from '../types/memberGroup.type'
import { MessageInput, ReplyMessageInput } from '../types/message.type'
import { ReactMessageInput, UpdateReactMessageInput } from '../types/reactMessage.type'
import { sendResponseSuccess } from '../utils/response'

class messageController {
  async getConversation(req: Request, res: Response) {
    if (req.user) {
      const { user_id: userLoggin } = req.user
      const data = await messageService.getConversation(userLoggin)

      sendResponseSuccess(res, data)
    }
  }
  async deteleConversation(req: Request, res: Response) {
    const { id } = req.params
    const data = await messageService.deteleConversation(id)

    sendResponseSuccess(res, data)
  }

  async createGroup(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
      const createGroupData: CreateGroupMessageInput = req.body
      const { user_id: userLoggin } = req.user // ID của người dùng đang thực hiện tạo nhóm

      const data = await messageService.createGroup(createGroupData, userLoggin)

      sendResponseSuccess(res, data)
    }
  }

  async addMembersToGroup(req: Request, res: Response) {
    const memberGroupData: CreateMemberGroupInput = req.body

    const data = await messageService.addMembersToGroup(memberGroupData)

    sendResponseSuccess(res, data)
  }

  async getMessage(req: Request, res: Response) {
    const { id } = req.params

    const data = await messageService.getMessage(id)

    sendResponseSuccess(res, data)
  }

  async sendMessage(req: Request, res: Response) {
    if (req.user) {
      const { user_id: sender } = req.user

      const messageData: MessageInput = req.body

      const data = await messageService.sendMessage(messageData, sender)

      sendResponseSuccess(res, data)
    }
  }

  async replyMessage(req: Request, res: Response) {
    if (req.user) {
      const replyMessageInput: ReplyMessageInput = req.body
      const { user_id: userLoggin } = req.user

      const data = await messageService.replyMessage(replyMessageInput, userLoggin)

      sendResponseSuccess(res, data)
    }
  }

  async deleteMessageFromOthers(req: Request, res: Response) {
    if (req.user) {
      const { id: message_id } = req.params
      const { user_id: userLoggin } = req.user // ID của người dùng đang thực hiện xóa

      const data = await messageService.deleteMessageFromOthers(message_id, userLoggin)

      sendResponseSuccess(res, data)
    }
  }

  async deleteMessageFromMe(req: Request, res: Response) {
    if (req.user) {
      const { id: messageId } = req.params
      const { user_id: userLoggin } = req.user //

      const data = await messageService.deleteMessageFromMe(messageId, userLoggin)

      sendResponseSuccess(res, data)
    }
  }

  async sendReactMessage(req: Request, res: Response) {
    if (req.user) {
      const reactMessageData: ReactMessageInput = req.body
      const { user_id } = req.user
      const data = await messageService.sendReactMessage({
        ...reactMessageData,
        user_id,
        createdBy: user_id
      })

      sendResponseSuccess(res, data)
    }
  }
}

export default new messageController()