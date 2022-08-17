import express from "express"
import { registerNewUser } from "../controllers/auth"

const router = express.Router()

// register user route
router.post("/register", registerNewUser)

export default router