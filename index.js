const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")

const authRoutes =  require("./routes/auth")

dotenv.config()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>{
  mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }).then(
      () => console.log("Connected to MongoDB")
    ).catch((error) => console.log(error.message))
})