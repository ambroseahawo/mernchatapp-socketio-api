import mongoose from "mongoose";
import User from "../models/User.js";
import Chat from "../models/Chat.js";
import CurrentChat from "../models/CurrentChat.js";

export const postCurrentChat = async (req, res) => {
  const userId = req.body.userId
  const chatId = req.body.chatId

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).send(`No user record with id: ${userId}`)
    }
    const user = await User.findById(userId)
    // is valid user id
    if (!user) {
      return res.status(404).send(`No user record with id: ${userId}`)
    }

    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(404).send(`No chat record with id: ${chatId}`)
    }
    const chat = await Chat.findById(chatId)
    // is valid chatId
    if (!chat) {
      return res.status(404).send(`No chat record with id: ${chatId}`)
    }

    const newCurrentChat = new CurrentChat({ userId, chatId })
    await newCurrentChat.save()

    res.status(200).json("Current chat saved successfully")
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const getCurrentChat = async (req, res) => {
  const userId = req.params.userId
  
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).send(`No user record with id: ${userId}`)
    }
    const user = await User.findById(userId)
    // is valid user id
    if (!user) {
      return res.status(404).send(`No user record with id: ${userId}`)
    }
    
    const currentChat = await CurrentChat.find({
      userId: { $in: userId }
    })
    const currentChatData = await Chat.findById(currentChat[0].chatId)
    const friendId = currentChatData.members.find((id) => id !== userId)
    const friendData = await User.findById(friendId)

    const { password, updatedAt, ...other } = friendData._doc
    const currentChatResponse = { ...other, currentChatId: currentChatData._id}
    
    res.status(200).json(currentChatResponse)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const updateCurrentChat = async (req, res) => {
  const userId = req.body.userId
  const chatId = req.body.chatId

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).send(`No user record with id: ${userId}`)
    }
    const user = await User.findById(userId)
    // is valid user id
    if (!user) {
      return res.status(404).send(`No user record with id: ${userId}`)
    }

    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(404).send(`No chat record with id: ${chatId}`)
    }
    const chat = await Chat.findById(chatId)
    // is valid chatId
    if (!chat) {
      return res.status(404).send(`No chat record with id: ${chatId}`)
    }

    const currentChat = await CurrentChat.find({
      userId: { $in: userId }
    })

    await currentChat[0].updateOne({ $set: { chatId } });

    res.status(200).json("Current chat Id updated successfully");
  } catch (error) {
    res.status(500).json(error.message)
  }
}