import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    senderId: {
      type: String
    },
    text: {
      type: String
    }
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
export default Message