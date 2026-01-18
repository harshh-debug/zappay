import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";
import { signupSchema } from "../schemas/signup-schema.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { signinSchema } from "../schemas/signin-schema.js";
import { updateUserSchema } from "../schemas/update-user-schema.js";
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
	throw new Error("JWT_SECRET is not defined");
}
export const loginUser = async (req: Request, res: Response) => {
	try {
		const result = signinSchema.safeParse(req.body);
		if (!result.success) {
			return res.json({
				success: false,
				message: "Required fields missing or incorrect input",
			});
		}

		const user = await prisma.user.findUnique({
			where: { email: result.data.email },
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
				id: user.id,
				email: user.email,
				fname: user.fname,
				lname: user.lname,
			},
			jwtSecret,
			{ expiresIn: "60m" },
		);

		res.cookie("accessToken", token, {
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
		});

		return res.json({
			success: true,
			message: "Login successful",
		});
	} catch (error) {
		return res.json({
			success: false,
			message: "Error signing in",
		});
	}
};

export const signupUser = async (req: Request, res: Response) => {
	try {
		const result = signupSchema.safeParse(req.body);
		if (!result.success) {
			return res.json({
				success: false,
				message: "Required fields missing or incorrect input",
			});
		}

		const { email, fname, lname, password } = result.data;

		const userExists = await prisma.user.findUnique({
			where: { email },
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
				email,
				fname,
				lname,
				password: hashedPass,
			},
		});

		await prisma.account.create({
			data: {
				balance: 1000,
				userId: user.id,
			},
		});

		const token = jwt.sign(
			{
				id: user.id,
				email: user.email,
				fname: user.fname,
				lname: user.lname,
			},
			jwtSecret,
			{ expiresIn: "60m" },
		);

		res.cookie("accessToken", token, {
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
		});

		return res.json({
			success: true,
			message: "User created successfully",
		});
	} catch (error) {
		return res.json({
			success: false,
			message: "Error signing up user",
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
		const updateData: {
			fname?: string;
			lname?: string;
			password?: string;
		} = {};
		if (fname) updateData.fname = fname;
		if (lname) updateData.lname = lname;
		if (password) {
			updateData.password = await bcrypt.hash(password, 10);
		}
		const updated = await prisma.user.update({
			where: {
				email: email,
			},
			data: updateData,
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

export const searchUser = async (req: Request, res: Response) => {
	try {
		const filter = req.query.filter || "";
		if (typeof filter !== "string") {
			return res.json({
				success: false,
				message: "Invalid filter parameter",
			});
		}
		const users = await prisma.user.findMany({
			where: {
				OR: [
					{
						fname: {
							contains: filter,
							mode: "insensitive",
						},
					},
					{
						lname: {
							contains: filter,
							mode: "insensitive",
						},
					},
				],
			},
		});
		if (users) {
			return res.json({
				success: true,
				data: users.map((user) => ({
					fname: user.fname,
					lname: user.lname,
					email: user.email,
					id: user.id,
				})),
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

