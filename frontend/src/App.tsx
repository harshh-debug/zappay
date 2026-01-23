import { Route, Routes } from "react-router";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import Signin from "./pages/Signin";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AuthRedirect from "./components/AuthRedirect";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<AuthRedirect />} />

			<Route
				path="/sign-in"
				element={
					<PublicRoute>
						<Signin />
					</PublicRoute>
				}
			/>
			<Route
				path="/sign-up"
				element={
					<PublicRoute>
						<Signup />
					</PublicRoute>
				}
			/>

			<Route
				path="/dashboard"
				element={
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/send"
				element={
					<ProtectedRoute>
						<SendMoney />
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
};

export default App;
