import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoute from "./routes/user.route.js"
import authroutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import postRoute from "./routes/post.route.js"

dotenv.config()


const app = express()
app.use(express.json()) 
app.use(cookieParser())

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
app.use("/api/post", postRoute)

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal sever error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});