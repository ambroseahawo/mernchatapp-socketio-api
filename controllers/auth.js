import User from "../models/User.js";
import bcrypt from "bcrypt"

// register user
export const registerNewUser = async(req, res) =>{
  try {
    // generate new hashed password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    })

    // save new user with response
    const user = await newUser.save()
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}