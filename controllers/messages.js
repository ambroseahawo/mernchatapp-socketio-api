import Message from ("../models/Message.js")

// create new messages
const createMessage = async(req, res) =>{
  const newMessage = new Message(req.body)

  try{
    const savedMessage = await newMessage.save()
    res.status(200).json(savedMessage)
  }catch(error){
    res.status(500).json(error)
  }
}