import mongoose from "mongoose"
import Chat from "../models/Chat.js"

// create new chat
export const newChat = async (req, res) => {
  const newChat = new Chat({
    members: [req.body.senderId, req.body.receiverId]
  })

  try {
    // check if the members array has only two items, distinct
    const validMembers = (newChat.members.length === 2) &&
      (new Set(newChat.members)).size === newChat.members.length

    if(!validMembers){
      return res.status(400).send(
        "Private chat should have only two distinct members"
      )
    }

    if (!mongoose.Types.ObjectId.isValid(newChat.members[0])) {
      return res.status(400).send("Invalid Member")
    }
    if (!mongoose.Types.ObjectId.isValid(newChat.members[1])) {
      return res.status(400).send("Invalid Member")
    }
    const savedChat = await newChat.save()
    res.status(200).json(savedChat)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

// get existing chat
export const getChat = async(req, res) =>{
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).send("Invalid User")
    }
    const chat = await Chat.find({
      members: { $in: [req.params.userId]}
    })
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error.message)
  }
}