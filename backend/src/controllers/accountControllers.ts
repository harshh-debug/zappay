import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";


export const getBalance = async (req: Request, res: Response) => {
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
			data: account.balance.toString(),
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

export const transferFund = async (req: Request, res: Response) => {
	try {
		const { amount, to } = req.body;
		const userId = req.user?.id;
		if (!userId || !amount || !to) {
			return res.status(400).json({
				success: false,
				message: "Invalid input",
			});
		}

		await prisma.$transaction(async (tx) => {
			const fromAccount = await tx.account.findUnique({
				where: {
					userId: userId,
				},
			});
			if (!fromAccount || fromAccount.balance < amount) {
				throw new Error("INSUFFICIENT_BALANCE");
			}

			const toAccount = await tx.account.findUnique({
				where: {
					userId: to,
				},
			});
			if (!toAccount) {
				throw new Error("INVALID_ACCOUNT");
			}

			await tx.account.update({
				where: { userId },
				data: {
					balance: {
						decrement: amount,
					},
				},
			});
			await tx.account.update({
				where: { userId: to },
				data: {
					balance: {
						increment: amount,
					},
				},
			});
		});
		return res.json({
			success: true,
			message: "Transfer successful",
		});
	} catch (error: any) {
		if (error.message === "INSUFFICIENT_BALANCE") {
			return res.status(400).json({
				success: false,
				message: "Insufficient balance",
			});
		}

		if (error.message === "INVALID_ACCOUNT") {
			return res.status(400).json({
				success: false,
				message: "Invalid account",
			});
		}

		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Transfer failed",
		});
	}
};
