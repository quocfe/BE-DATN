import { NextFunction, Request, Response } from 'express'
import messageService from '../services/messageService'
import { CreateGroupMessageInput } from '../types/groupMessage.type'
import { CreateMemberGroupInput } from '../types/memberGroup.type'
import { MessageInput, MessageMediaInput, ReplyMessageInput } from '../types/message.type'
import { ReactMessageInput, UpdateReactMessageInput } from '../types/reactMessage.type'
import { sendResponseSuccess } from '../utils/response'
import { StatusCodes } from 'http-status-codes'
import { generateToken04 } from '../services/zegoServerAssistant'

class messageController {
  async getConversation(req: Request, res: Response) {
    if (req.user) {
      const { user_id: userLoggin } = req.user
      const { page = 1, limit = 10 } = req.query
      const data = await messageService.getConversation(userLoggin, +page, +limit)

      sendResponseSuccess(res, data)
    }
  }

  async changeImageGroup(req: Request, res: Response) {
    if (req.user) {
      const { image, group_id } = req.body
      const { user_id: userLoggin } = req.user
      const data = await messageService.changeImageGroup(group_id, image, userLoggin)
      sendResponseSuccess(res, data)
    }
  }

  async changeGroupName(req: Request, res: Response) {
    if (req.user) {
      const { group_name, group_id } = req.body
      const { user_id: userLoggin } = req.user
      const data = await messageService.changeGroupName(group_id, group_name, userLoggin)
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

  async getMembersGroup(req: Request, res: Response) {
    if (req.user) {
      const { id } = req.params
      const { user_id: userLoggin } = req.user
      const data = await messageService.getMembersGroup(id, userLoggin)

      sendResponseSuccess(res, data)
    }
  }

  async addMembersToGroup(req: Request, res: Response) {
    const memberGroupData: CreateMemberGroupInput = req.body

    const data = await messageService.addMembersToGroup(memberGroupData)

    sendResponseSuccess(res, data)
  }

  async getOneToOneMessage(req: Request, res: Response) {
    if (req.user) {
      const { user_id: sender } = req.user
      const { id: receiver } = req.params
      const { page, limit } = req.query

      if (page && limit) {
        const data = await messageService.getOneToOneMessage(receiver, sender, +page, +limit)
        res.status(200).json(data)
      } else {
        const data = await messageService.getOneToOneMessage(receiver, sender)
        res.status(200).json(data)
      }
    }
  }

  async getGroupMessage(req: Request, res: Response) {
    if (req.user) {
      const { id } = req.params
      const { page, limit } = req.query
      const { user_id: sender } = req.user
      if (page && limit) {
        const data = await messageService.getGroupMessage(id, sender, +page, +limit)
        res.status(200).json(data)
      }
    }
  }

  async getRecallMessage(req: Request, res: Response) {
    const data = await messageService.getRecallMessage()

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

  async sendCallMessage(req: Request, res: Response) {
    const messageData: MessageInput = req.body

    const data = await messageService.sendCallMessage(messageData)

    sendResponseSuccess(res, data)
  }

  async sendMessageAttach(req: Request, res: Response) {
    if (req.user) {
      const { user_id: sender } = req.user
      const messageData: MessageMediaInput = req.body

      // console.log(req.file)
      // if (req.file) {
      //   messageData.body = req.file.originalname
      //   messageData.sub_body = req.file.path
      // }

      // const dataAfterUpload = {
      //   body: messageData.body,
      //   sub_body: messageData.sub_body,
      //   receiver: messageData.receiver,
      //   group_message_id: messageData.group_message_id,
      //   type: messageData.type
      // }

      const data = await messageService.sendMessageAttach(messageData, sender)

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

  async recallMessage(req: Request, res: Response) {
    if (req.user) {
      const { message_id, forAll } = req.body
      const { user_id: userLoggin } = req.user // ID của người dùng đang thực hiện xóa

      const data = await messageService.recallMessage(message_id, userLoggin, forAll)

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
      //test send react message
      sendResponseSuccess(res, data)
    }
  }

  async searchMessage(req: Request, res: Response) {
    if (req.user) {
      const { query, conversationId } = req.params
      const { user_id: userLoggin } = req.user
      const data = await messageService.searchMessage(query, conversationId, userLoggin)
      //test send react message

      sendResponseSuccess(res, data)
    }
  }

  async getListFriendsSuggest(req: Request, res: Response) {
    if (req.user) {
      const { user_id: userLoggin } = req.user
      const { id: group_id } = req.params
      const data = await messageService.getListFriendsSuggest(group_id, userLoggin)
      sendResponseSuccess(res, data)
    }
  }

  async leaveAndDeleteUserGroup(req: Request, res: Response) {
    if (req.user) {
      const { user_id, group_id } = req.params
      const { user_id: userLoggin } = req.user
      const data = await messageService.leaveAndDeleteUserGroup(group_id, user_id, userLoggin)
      res.status(200).json(data)
    }
  }

  async changeRoleGroup(req: Request, res: Response) {
    if (req.user) {
      const { user_id, group_id } = req.body
      const { user_id: userLoggin } = req.user
      const data = await messageService.changeRoleGroup(group_id, user_id, userLoggin)

      res.status(200).json(data)
    }
  }

  async searchFriendAndConversation(req: Request, res: Response) {
    if (req.user) {
      const { query } = req.params
      const { user_id: userLoggin } = req.user
      const data = await messageService.searchFriendAndConversation(userLoggin, query)

      res.status(200).json(data)
    }
  }

  // tạo token cho zegoCould

  async generateTokenZego(req: Request, res: Response) {
    const userId = req.params.userId
    const zegoAppId = process.env.ZEGO_APP_ID
    const appID = zegoAppId ? parseInt(zegoAppId) : 0
    const serverSecert = process.env.ZEGO_SERVER_SECRET
    const effectiveTimeInSeconds = 3600
    const payload = ''
    if (appID && serverSecert && userId) {
      const token = generateToken04(appID, userId, serverSecert, effectiveTimeInSeconds, payload)
      res.status(200).json(token)
    }
    res.status(404).json('appID, serverSecert or userId invalid')
  }
}

export default new messageController()
