import { useNavigate, useSearchParams } from "react-router-dom";
import { Heading } from "../components/Heading";
import axiosClient from "../utils/axiosClient";
import { useState } from "react";

const SendMoney = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [amount, setAmount] = useState("");
	const [loading, setLoading] = useState(false);
	const id = searchParams.get("id");
	const name = searchParams.get("name");
	if (!id || !name) {
		navigate("/dashboard");
	}
	const numberAmount=Number(amount)
	const numberId=Number(id)
	async function transferMoney() {
		try {
			if (numberAmount <= 0) {
				alert("Enter a valid amount");
				return;
			}
			setLoading(true);
			const res = await axiosClient.post("/account/transfer", {
				to: numberId,
				amount:numberAmount,
			});
			if (res) {
				setLoading(false);
				if (res.data.success) {
					alert("Transfer succesfull");
				} else {
					console.log(res.data.message);
					alert("Transfer failed");
				}
			}
		} catch (error) {
			console.log(error);
			alert("Internal Server error");
		}
	}
	return (
		<div className="h-screen w-full bg-slate-200 flex justify-center items-center">
			<div className="w-80 bg-white shadow-2xl rounded-2xl p-6">
				<Heading label="Send Money" />

				<div className="flex items-center mt-8 mb-6">
					<div className="rounded-full h-12 w-12 bg-green-400 flex justify-center items-center mr-4">
						<div className="text-xl font-semibold">
							{name?.charAt(0).toUpperCase()}
						</div>
					</div>
					<div className="text-lg font-bold">{name}</div>
				</div>

				<div className="font-medium mb-1">Amount (in ₹)</div>
				<input
					onChange={(e) => setAmount(e.target.value)}
					type="text"
					placeholder="Enter amount"
					className="w-full px-3 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-400"
				/>

				<div className="mt-6 text-center">
					<button
						disabled={loading}
						onClick={transferMoney}
						type="button"
						className="text-white bg-green-500 box-border border border-transparent shadow-xs font-medium   text-sm px-4 py-2.5 focus:outline-none mt-5 rounded-lg cursor-pointer mb-3"
					>
						{loading ? 'Processing...' : 'Initiate Transfer'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default SendMoney;
