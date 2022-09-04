import mongoose from "mongoose"
import Chat from "../models/Chat.js"
import User from "../models/User.js"


export const getChatUsers = async(req, res) =>{
  try {
    if (!mongoose.Types.ObjectId.isValid(req.body.userId)) {
      return res.status(404).send(`No user record with id: ${req.body.userId}`)
    }
    const user = await User.findById(req.body.userId)
    // is valid user id
    if (!user) {
      return res.status(404).send(`No user record with id: ${req.body.userId}`)
    }

    // if (!mongoose.Types.ObjectId.isValid(req.params.chatId)) {
    //   return res.status(404).send(`No chat record with id: ${req.params.chatId}`)
    // }
    // const chat = await Chat.findById(req.params.chatId)
    // // is valid chatId
    // if (!chat) {
    //   return res.status(404).send(`No user record with id: ${req.params.chatId}`)
    // }

    const chats = await Chat.find({
      members: { $in: [req.body.userId] }
    })

    let chatUserIds = []
    chats.forEach(async (chat) => {
      const friendId = chat.members.find((userId) => userId !== req.body.userId)
      chatUserIds.push(friendId)
      // const chatUser = await User.find({
      //   _id: { $in: [friendId] }
      // })
      // delete chatUser.password
      // chatUsers.push(chatUser)

      // const { password, updatedAt, ...other } = chatUser[0]._doc

      // chatUserIds.push(other)
    })

    const chatUsers = await User.find({
      _id: { $in: [...chatUserIds] }
    })

    const filteredChatUsers = chatUsers.map((userData) => {
      const { password, updatedAt, ...other } = userData._doc
      return other
    })

    res.status(200).json(filteredChatUsers)
    chatUserIds = []
  } catch (error) {
    res.status(500).json(error.message)
  }
}