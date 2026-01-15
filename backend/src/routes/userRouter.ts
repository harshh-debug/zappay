import express from "express";
import { loginUser, searchUser, signupUser, updateUser } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const userRouter=express.Router()


userRouter.post("/sign-up",signupUser)
userRouter.post("/sign-in",loginUser)
userRouter.put("/update",authMiddleware,updateUser)
userRouter.get("/bulk",searchUser)




export default userRouter