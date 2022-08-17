import express, { json } from "express"
const app = express()
import mongoose from "mongoose"
import { config } from "dotenv"
import cors from "cors"

import authRoutes from "./routes/auth.js"

config()

app.use(cors())
app.use(json())

app.use("/api/auth", authRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>{
  mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }).then(
      () => console.log("Connected to MongoDB")
    ).catch((error) => console.log(error.message))
})