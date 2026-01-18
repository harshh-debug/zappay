import { useEffect } from "react";
import { useNavigate } from "react-router";
import axiosClient from "../utils/axiosClient";

const AuthRedirect = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const res = await axiosClient.get("/user/check");

				if (res.data?.success) {
					navigate("/dashboard", { replace: true });
				} else {
					navigate("/sign-in", { replace: true });
				}
			} catch {
				navigate("/sign-in", { replace: true });
			}
		};

		checkAuth();
	}, [navigate]);

	return null; 
};

export default AuthRedirect;
