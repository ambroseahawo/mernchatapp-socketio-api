import mongoose from "mongoose"
import Message from "../models/Message.js"
import Chat from "../models/Chat.js"
import User from "../models/User.js"

// create new messages
export const createMessage = async(req, res) =>{
  const newMessage = new Message(req.body)

  try{
    // is valid id
    if (!mongoose.Types.ObjectId.isValid(req.body.chatId)) {
      return res.status(404).send(`No chat record with id: ${req.body.chatId}`)
    }
    // is valid chat id
    const currentChat = await Chat.findById(req.body.chatId)
    if(!currentChat){
      return res.status(404).send(`No chat record with id: ${req.body.chatId}`)
    }

    // is valid id
    if (!mongoose.Types.ObjectId.isValid(req.body.senderId)) {
      return res.status(404).send(`No user record with id: ${req.body.senderId}`)
    }
    // is valid user id
    const sender = await User.findById(req.body.senderId)
    if (!sender) {
      return res.status(404).send(`No user record with id: ${req.body.senderId}`)
    }

    // validate if the sender is part of the chat
    if (!(currentChat.members.includes(String(req.body.senderId)))){
      return res.status(400).send("Can't send messages to this chat")
    }
    const savedMessage = await newMessage.save()
    res.status(200).json(savedMessage)
  }catch(error){
    res.status(500).json(error.message)
  }
}

// get existing messages
export const getMessages = async(req, res) =>{
  try {
    // is valid id
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(404).send(`No user record with id: ${req.params.userId}`)
    }
    // is valid user id
    const user = await User.findById(req.params.userId)
    if (!user) {
      return res.status(404).send(`No user record with id: ${req.params.userId}`)
    }

    // is valid id
    if (!mongoose.Types.ObjectId.isValid(req.params.chatId)) {
      return res.status(404).send(`No chat record with id: ${req.params.chatId}`)
    }
    // is valid chat id
    const currentChat = await Chat.findById(req.params.chatId)
    if (!currentChat) {
      return res.status(404).send(`No chat record with id: ${req.params.chatId}`)
    }

    // validate if the sender is part of the chat
    if (!(currentChat.members.includes(String(req.params.userId)))) {
      return res.status(400).send("Can't view messages on this chat")
    }
    const messages = await Message.find({
      chatId: req.params.chatId
    })
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json(error.message)
  }
} 