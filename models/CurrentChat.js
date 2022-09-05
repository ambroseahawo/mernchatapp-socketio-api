import mongoose from "mongoose"

const CurrentChatSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    chatId: {
      type: String,
    }
  },
  { timestamps: true }
);

const CurrentChat = mongoose.model("Chat", CurrentChatSchema);
export default CurrentChat
