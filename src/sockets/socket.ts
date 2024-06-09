import { createServer } from 'http'
import { Server } from 'socket.io'
import express, { Express, urlencoded } from 'express'

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
  console.log('userSocketMap', userSocketMap)
  console.log('a user connected socketID', socket.id)
  const user_id = socket.handshake.query.user_id as string
  if (user_id != 'undefined') userSocketMap[user_id] = socket.id
  console.log('user_id', user_id)
  io.emit('getOnlineUsers', Object.keys(userSocketMap))

  socket.on('disconnect', () => {
    console.log('a user disconnected', socket.id)
    delete userSocketMap[user_id]
    io.emit('getOnlineUsers', Object.keys(userSocketMap))
  })
})

export { app, httpServer, io }
