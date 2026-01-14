import "dotenv/config";
import express from "express";
import mainRouter from "./routes/mainRouter.js";
import cors from "cors";


const app= express()
app.use(express.json())
app.use(cors())
app.use("/api/v1",mainRouter)

app.listen(3000,()=>{
    console.log("Listening at 3000")
})