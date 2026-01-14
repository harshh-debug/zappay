import express from "express";
import { loginUser, signupUser } from "../controllers/authController.js";
const userRouter=express.Router()


userRouter.post("/sign-up",signupUser)
userRouter.post("/sign-in",loginUser)




export default userRouter