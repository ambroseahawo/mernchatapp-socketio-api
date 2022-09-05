import express from "express"
import { getChat, newChat } from "../controllers/chats.js"
import { getChatUsers } from "../controllers/chatUsers.js"
import { getCurrentChat, postCurrentChat } from "../controllers/currentChat.js"

const router = express.Router()

router.get("/users", getChatUsers)
router.post("/current", postCurrentChat)
router.get("/current", getCurrentChat)
router.get("/:userId", getChat)
router.post("/", newChat)

export default router