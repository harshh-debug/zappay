import { useEffect, useState, type JSX } from "react";
import { useNavigate } from "react-router";
import axiosClient from "../utils/axiosClient";
import { useAuth } from "../context/AuthProvider";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const { setUser } = useAuth();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const res = await axiosClient.get("/user/check");

				if (res.data?.success) {
					setUser(res.data.data);
					setLoading(false); 
				} else {
					navigate("/sign-in");
				}
			} catch (error) {
				navigate("/sign-in"); 
			}
		};

		checkAuth();
	}, [navigate]);

	if (loading) return null; 

	return children;
};

export default ProtectedRoute;
