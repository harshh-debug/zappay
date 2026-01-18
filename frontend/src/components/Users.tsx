import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { User } from "./User";

interface UserType {
	id: number;
	fname: string;
	lname: string;
	email: string;
}

interface BulkUserResponse {
	success: boolean;
	data: UserType[];
	message?: string;
}

export const Users = () => {
	const [users, setUsers] = useState<UserType[]>([]);
	const[filter,setFilter]=useState("")

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axiosClient.get<BulkUserResponse>("/user/bulk?filter="+ filter);
				if (response.data.success) {
					setUsers(response.data.data);
				} else {
					console.log(response.data.message);
				}
			} catch (error) {
				console.error("Fetch failed", error);
			}
		};

		fetchUsers();
	}, [filter]);

	return (
		<>
			<div className="font-bold mt-6 text-lg ml-3">Users</div>
			<div className="my-2 ml-2">
				<input onChange={e=>setFilter(e.target.value)} type="text" placeholder="Search users..." className="w-full px-2 border rounded border-slate-200 p-1 focus:outline-none" />
			</div>
			<div>
				{users.map((user,index)=><User user={user} key={index}></User>)}
			</div>
		</>
	);
};
