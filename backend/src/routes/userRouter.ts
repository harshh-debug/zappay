import express, { type Request, type Response } from "express";
import {
	loginUser,
	searchUser,
	signupUser,
	updateUser,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const userRouter = express.Router();

userRouter.post("/sign-up", signupUser);
userRouter.post("/sign-in", loginUser);
userRouter.put("/update", authMiddleware, updateUser);
userRouter.get("/bulk", authMiddleware, searchUser);
userRouter.get("/check", authMiddleware, (req: Request, res: Response) => {
	if (req.user) {
		return res.json({
			success: true,
			message: "Valid User",
			data: {
				id: req.user?.id,
				email: req.user?.email,
				fname: req.user?.fname,
				lname: req.user?.lname,
			},
		});
	} else {
		return res.json({
			success: false,
			message: "Invalid User",
		});
	}
});

export default userRouter;
