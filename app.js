import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import { connectDB } from "./data/database.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"


const app = express();
config({
  path:"./data/config.env"
})
connectDB();
//using middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:[process.env.FRONTEND_URL],
  methods:["GET","POST","DELETE","UPDATE"],
  credentials:true,
}));
//Importing Routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);





app.listen(process.env.PORT,()=>{
    console.log(`server is running on port : ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
});

