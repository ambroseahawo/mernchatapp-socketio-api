import express from "express"
import { registerNewUser, loginExistingUser } from "../controllers/auth.js"

const router = express.Router()

// register user route
router.post("/register", registerNewUser)
router.post("/login", loginExistingUser)

export default router