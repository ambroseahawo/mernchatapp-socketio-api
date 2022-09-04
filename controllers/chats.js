import mongoose from "mongoose"
import Chat from "../models/Chat.js"
import User from "../models/User.js"

// create new chat
export const newChat = async (req, res) => {
  const newChat = new Chat({
    members: [req.body.memberId, req.body.alsoMemberId]
  })

  try {
    // check if the members array has only two items, distinct
    const validMembers = (newChat.members.length === 2) &&
      (new Set(newChat.members)).size === newChat.members.length

    if(!validMembers){
      return res.status(400).send(
        "Private chat should have exactly two members.The two members must be distinct."
      )
    }

    if (!mongoose.Types.ObjectId.isValid(newChat.members[0])) {
      return res.status(404).send(`No user record with id: ${newChat.members[0]}`)
    }
    // is valid user id
    const member = await User.findById(newChat.members[0])
    if (!member) {
      return res.status(404).send(`No user record with id: ${newChat.members[0]}`)
    }

    if (!mongoose.Types.ObjectId.isValid(newChat.members[1])) {
      return res.status(404).send(`No user record with id: ${newChat.members[1]}`)
    }
    // is valid user id
    const alsoMember = await User.findById(newChat.members[1])
    if (!alsoMember) {
      return res.status(404).send(`No user record with id: ${newChat.members[1]}`)
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
      return res.status(404).send(`No user record with id: ${req.params.userId}`)
    }
    const user = await User.findById(req.params.userId)
    // is valid user id
    if (!user) {
      return res.status(404).send(`No user record with id: ${req.params.userId}`)
    }
    const chats = await Chat.find({
      members: { $in: [req.params.userId]}
    })
    
    res.status(200).json(chats)
  } catch (error) {
    res.status(500).json(error.message)
  }
}