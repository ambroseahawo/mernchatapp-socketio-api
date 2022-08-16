const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>{
  console.log("Backend server running")
})