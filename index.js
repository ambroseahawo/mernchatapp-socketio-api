import express, { json } from "express"
const app = express()
import mongoose from "mongoose"
import { config } from "dotenv"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"

import authRoutes from "./routes/auth.js"
import usersRoutes from "./routes/users.js"
import chatsRoutes from "./routes/chats.js"
import messagesRoutes from "./routes/messages.js"

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

config()

app.use(cors())
app.use(json())

app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/chats", chatsRoutes)
app.use("/api/messages", messagesRoutes)

let users = []

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId })
}

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId)
}

const getUser = (userId) => {
  return users.find((user) => user.userId == userId)
}

io.on("connection", (socket) => {
  // when connect
  console.log(`A user connected on ${socket.id}`)
  // io.emit("welcome", "hello, this is socket server!") // sends to all users connected

  // sends to specific user connected
  // take userid and socketid from user
  socket.on("addUser", userId => {
    addUser(userId, socket.id)
    io.emit("getUsers", users)
  })

  // send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId)
    io.to(user.socketId).emit("getMessage", {
      senderId, text
    })
  })

  // when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id)
    io.emit("getUsers", users)
  })
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }).then(
      () => console.log("Connected to MongoDB")
    ).catch((error) => console.log(error.message))
})