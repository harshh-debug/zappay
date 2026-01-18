import { useAuth } from "../context/AuthProvider";

export const AppBar = () => {
	const { user } = useAuth();
	return (
		<div className="flex justify-between h-14 shadow">
			<div className="flex  items-center ml-4">ZapPay App</div>
			<div className="flex">
				<div className="flex flex-col justify-center h-full mr-4">Hello</div>
				<div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center">
					<div className="flex flex-col justify-center h-full text-xl">{user?.fname?.[0].toUpperCase()}</div>
				</div>
			</div>
		</div>
	);
};
