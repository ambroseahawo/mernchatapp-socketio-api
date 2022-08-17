import User from "../models/User.js";
import bcrypt from "bcrypt"

// register user
export const registerNewUser = async (req, res) => {
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
    const user = await User.findOne({ email: req.body.email })
    !user && res.status(404).json("User not found")

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("Invalid Password. Please try again!")

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
}