import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(403).json({
			success: false,
			message: "Unauthorized",
		});
	}
	const token = authHeader.split(" ")[1];
	if (!token) {
		return res.status(403).json({
			success: false,
			message: "Unauthorized: token not present",
		});
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & {
			id:number,
			username:string,
			email: string;
			fname: string;
			lname: string;
		};
		if (decoded) {
			req.user = decoded;
			next();
		} else {
			return res.status(403).json({
				success: false,
				message: "Invalid token",
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(403).json({
			success: false,
			message: "Unexpected error occured",
		});
	}
};
export default authMiddleware