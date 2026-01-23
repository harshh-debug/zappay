import { useEffect, useState, type JSX } from "react";
import { useNavigate } from "react-router";
import axiosClient from "../utils/axiosClient";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
	const navigate = useNavigate();
	const [checking, setChecking] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const res = await axiosClient.get("/user/check");

				if (res.data?.success) {
					navigate("/dashboard", { replace: true });
				} else {
					setChecking(false);
				}
			} catch {
				// 403 → NOT logged in → allow sign-in page
				setChecking(false);
			}
		};

		checkAuth();
	}, [navigate]);

	if (checking) return null;

	return children;
};

export default PublicRoute;
