import { createServer } from 'http'
import { Server } from 'socket.io'
import express, { Express, urlencoded } from 'express'
import messageSocketService from '../services/messageSocketService'
import seenMessageService from '../services/seenMessageService'
import { CallMessage } from '../types/socket.type'

const app: Express = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: `http://localhost:8080`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
})

const userSocketMap: { [key: string]: string } = {} // {userId: socketId}

export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId]
}

io.on('connection', (socket) => {
  console.log('a user connected socketID', socket.id)
  const user_id = socket.handshake.query.user_id as string
  if (user_id != 'undefined') userSocketMap[user_id] = socket.id
  io.emit('getOnlineUsers', Object.keys(userSocketMap))

  if (user_id) {
    ;(async () => {
      {
        await seenMessageService.receivedSeenMessage(user_id)
      }
    })()
  }

  socket.on('isTyping', async (data) => {
    const { user_id: userTyping, groupID } = JSON.parse(data)
    await messageSocketService.emitIsTyping(groupID, userTyping, user_id)
  })

  socket.on('isNotTyping', async (data) => {
    const { user_id, groupID } = JSON.parse(data)
    await messageSocketService.emitIsNotTyping(groupID, user_id)
  })

  socket.on('seenMessage', async (data) => {
    const { group_id: group_message_id, message_id, user_id } = JSON.parse(data)
    await seenMessageService.seenMessage(group_message_id, message_id, user_id)
    await messageSocketService.emitSeenedMessage(group_message_id)
  })

  socket.on('callVideo', async (data: CallMessage) => {
    await messageSocketService.emitInComingCall(data)
  })

  socket.on('cancelVideoCall', async (data) => {
    await messageSocketService.emitCancelVideoCall(data)
    // emit missCall
  })

  socket.on('cancelInComingVideoCall', async (data) => {
    await messageSocketService.emitCancelInComingVideoCall(data)
  })

  socket.on('acceptInComingVideoCall', async (data) => {
    await messageSocketService.emitAcceptVideoCall(data)
  })

  socket.on('endCall', async (group_id_query) => {
    console.log('endCall')
    await messageSocketService.emitEndCall(group_id_query)
  })

  socket.on('disconnect', () => {
    console.log('a user disconnected', socket.id)
    delete userSocketMap[user_id]
    io.emit('getOnlineUsers', Object.keys(userSocketMap))
  })
})

export { app, httpServer, io, userSocketMap }
