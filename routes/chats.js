import express from "express"
import { getChat, newChat } from "../controllers/chats.js"

const router = express.Router()

router.get("/:userId", getChat)
router.post("/", newChat)

export default router