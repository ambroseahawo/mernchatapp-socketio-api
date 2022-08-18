import express from "express"
import { createMessage, getMessages } from "../controllers/messages.js"

const router = express.Router()

router.get("/:userId/:chatId", getMessages)
router.post("/", createMessage)

export default router