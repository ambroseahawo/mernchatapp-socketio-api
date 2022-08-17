import express from "express"
import { newChat } from "../controllers/chats.js"

const router = express.Router()

router.post("/", newChat)

export default router