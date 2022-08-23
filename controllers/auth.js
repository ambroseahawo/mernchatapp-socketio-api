import User from "../models/User.js";
import bcrypt from "bcrypt"

// register user
export const registerNewUser = async (req, res) => {
  try {
    // check if user exists already
    const existingUserEmail = await User.findOne({ email: req.body.email })
    if (existingUserEmail){
      return res.status(500).json("Email already registered. Try logging in")
    }
    const existingUsername = await User.findOne({ username: req.body.username })
    if (existingUsername){
      return res.status(500).json("Username already registered. Try logging in")
    }
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
    const { password, updatedAt, ...other } = user._doc
    res.status(200).json(other)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// login existing user
export const loginExistingUser = async (req, res) => {
  try {
    // find user id in db
    const user = await User.findOne({ email: req.body.email })
    if (!user){
      return res.status(404).json(`No user record with email: ${req.body.email}`) 
    }

    // compare login password with user saved password
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword){
      return res.status(400).json("Invalid Password. Please try again!")
    }

    // exclude password from response
    const { password, updatedAt, ...other } = user._doc
    res.status(200).json(other)
  } catch (error) {
    res.status(500).json(error)
  }
}