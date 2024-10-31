import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoute from "./routes/user.route.js"
import authroutes from "./routes/auth.route.js"
dotenv.config()


const app = express()
app.use(express.json()) 

mongoose.connect(process.env.MONGO)
.then(() =>{
    console.log("mongodb connected successfully")
})
.catch((error)=>{
 console.log(error)
})


app.listen(3000, () =>{
  console.log("server running on port 3000")
})     

app.use("/api/user", userRoute)
app.use("/api/auth", authroutes) 