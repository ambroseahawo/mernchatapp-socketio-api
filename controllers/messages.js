import mongoose from "mongoose"
import Message from "../models/Message.js"

// create new messages
export const createMessage = async(req, res) =>{
  const newMessage = new Message(req.body)

  try{
    if (!mongoose.Types.ObjectId.isValid(req.body.chatId)) {
      return res.status(400).send("Invalid Chat")
    }
    if (!mongoose.Types.ObjectId.isValid(req.body.senderId)) {
      return res.status(400).send("Invalid Sender")
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
    if (!mongoose.Types.ObjectId.isValid(req.params.chatId)) {
      return res.status(400).send("Invalid Chat")
    }
    const messages = await Message.find({
      chatId: req.params.chatId
    })
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json(error.message)
  }
} 