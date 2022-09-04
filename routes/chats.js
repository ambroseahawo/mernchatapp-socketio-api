import express from "express"
import { getChat, newChat } from "../controllers/chats.js"
import { getChatUsers } from "../controllers/chatUsers.js"

const router = express.Router()

router.get("/users", getChatUsers)
router.get("/:userId", getChat)
router.post("/", newChat)

export default router