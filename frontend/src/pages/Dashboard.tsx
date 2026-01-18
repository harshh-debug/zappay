import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axiosClient from "../utils/axiosClient";

const Dashboard = () => {
	const [userBalance, setUserbalance] = useState("");
	useEffect(() => {
		async function getBalance() {
			try {
				const res = await axiosClient.get("/account/balance");
				if (res.data.success) {
					setUserbalance(res.data.data);
				}else{
          console.log(res.data.message)
        }
			} catch (error) {
        console.log("Error fetching user balance: "+error)
      }
		}
    getBalance()
	},[]);
	return (
		<div>
			<AppBar></AppBar>
			<div className="m-3">
				<Balance value={userBalance}></Balance>
			</div>
			<Users></Users>
		</div>
	);
};

export default Dashboard;
