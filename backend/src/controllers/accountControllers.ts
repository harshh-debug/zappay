import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const getBalance=async (req: Request, res: Response) => {
		try {
			const userId = req.user?.id;
			if (!userId) {
				return res.json({
					success: false,
					message: "Invalid user",
				});
			}
			const account = await prisma.account.findUnique({
				where: {
					userId: userId,
				},
			});
			if (!account) {
				return res.json({
					success: false,
					message: "Account not found",
				});
			}

			res.json({
				success: true,
				data: account.balance,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				success: false,
				message: "Internal server error",
			});
		}
}

export const transferFund=async (req: Request, res: Response)=>{
    
}