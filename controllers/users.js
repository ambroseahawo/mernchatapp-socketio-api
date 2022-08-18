import mongoose from "mongoose"
import User from "../models/User.js"

// get user
export const getUser = async(req, res) =>{
  const userId = req.query.userId
  // const username = req.query.username

  try{
    // validate id
    if (!mongoose.Types.ObjectId.isValid(userId)){
      return res.status(404).send(`No user record with id: ${userId}`)
    }
    
    const user = await User.findById(userId)
    // is valid user id
    if (!user) {
      return res.status(404).send(`No user record with id: ${userId}`)
    }

    const { password, updatedAt, ...other } = user._doc
    res.status(200).json(other)
  }catch(error){
    res.status(500).json(error.message)
  }
}