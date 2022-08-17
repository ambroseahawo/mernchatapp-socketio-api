import mongoose from "mongoose"

const ChatSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    }
  },
  { timestamps: true }
);

const Chat = mongoose.model("Conversation", ChatSchema);
export default Chat
