import { Route, Routes } from "react-router";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import Signin from "./pages/Signin";

const App = () => {
	return (
		<>
	
				<Routes>
          <Route path="/sign-up" element={<Signup></Signup>}></Route>
          <Route path="/sign-in" element={<Signin></Signin>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/send" element={<SendMoney></SendMoney>}></Route>

        </Routes>
		</>
	);
};

export default App;
