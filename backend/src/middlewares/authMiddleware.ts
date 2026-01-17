import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies?.accessToken;

	if (!token) {
		return res.status(403).json({
			success: false,
			message: "Unauthorized",
		});
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & {
			id: number;
			email: string;
			fname: string;
			lname: string;
		};

		req.user = decoded;
		next();
	} catch (error) {
		return res.status(403).json({
			success: false,
			message: "Invalid token",
		});
	}
};

export default authMiddleware;
