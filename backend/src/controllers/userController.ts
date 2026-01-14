import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";
import { signupSchema } from "../schemas/signup-schema.js";
import jwt from "jsonwebtoken";
import { signinSchema } from "../schemas/signin-schema.js";
import { updateUserSchema } from "../schemas/update-user-schema.js";
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
	throw new Error("JWT_SECRET is not defined");
}
export const loginUser = async (req: Request, res: Response) => {
	try {
		const body = req.body;
		const result = signinSchema.safeParse(body);
		if (!result.success) {
			return res.json({
				success: false,
				message: "Required fields missing or incorrect input",
			});
		}
		const user = await prisma.user.findFirst({
			where: {
				email: result.data.email,
			},
		});
		if (!user) {
			return res.json({
				success: false,
				message: "Invalid email or password",
			});
		}
		const match = await bcrypt.compare(result.data.password, user.password);
		if (!match) {
			return res.json({
				success: false,
				message: "Invalid email or password",
			});
		}

		const token = jwt.sign(
			{
				email: user.email,
				fname: user.fname,
				lname: user.lname,
			},
			jwtSecret,
			{ expiresIn: "60m" }
		);
		return res.json({
			success: true,
			token: token,
		});
	} catch (error) {
		console.log(error);
		return res.json({
			success: false,
			message: "Error signing in",
		});
	}
};

export const signupUser = async (req: Request, res: Response) => {
	try {
		const body = req.body;
		const result = signupSchema.safeParse(body);
		if (!result.success) {
			return res.json({
				success: false,
				message: "Required fields missing or incorrect input",
			});
		}
		const { email, fname, lname, password } = result.data;

		const userExists = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});
		if (userExists) {
			return res.json({
				success: false,
				message: "User already exists",
			});
		}
		const hashedPass = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: {
				email: email,
				fname: fname,
				lname: lname,
				password: hashedPass,
			},
		});

		const token = jwt.sign(
			{
				email: user.email,
				fname: user.fname,
				lname: user.lname,
			},
			jwtSecret,
			{ expiresIn: "60m" }
		);
		if (user) {
			return res.json({
				success: true,
				message: "User created sucessfully",
				token: token,
			});
		}
	} catch (error) {
		console.log(error);
		return res.json({
			success: false,
			message: `Error signing up user`,
		});
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const body = req.body;
		const result = updateUserSchema.safeParse(body);
		if (!result.success) {
			return res.json({
				success: false,
				message: "Required fields missing or incorrect input",
			});
		}
		const { fname, lname, password } = result.data;

		const email = req.user?.email;
		if (!email) {
			return res.status(403).json({
				success: false,
				message: "Invalid payload",
			});
		}
		const hashedPass = await bcrypt.hash(password, 10);
		const updated = await prisma.user.update({
			where: {
				email: email,
			},
			data: {
				fname: fname,
				lname: lname,
				password: hashedPass,
			},
		});
		if (updated) {
			return res.status(200).json({
				success: true,
				message: "User updated successfully",
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};
