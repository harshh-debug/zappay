import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router";

const Signup = () => {
	const navigate=useNavigate()
	const [fname, setFname] = useState("");
	const [lname, setlname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const[loading,setLoading]=useState(false)

	async function handleSignup() {
		setLoading(true)
		try {
			const response=await axiosClient.post("/user/sign-up", {
				fname,
				lname,
				email,
				password,
			});
			if(response.data.success){
				navigate("/dashboard")
			}else{
				console.log(response.data.message)
			}
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<div className="bg-slate-300 h-screen flex justify-center ">
			<div className="flex flex-col justify-center">
				<div className="bg-white flex flex-col justify-center w-80 p-2 h-max px-4 rounded-lg">
					<Heading label="Sign up"></Heading>
					<SubHeading label="Enter your information to create an account"></SubHeading>
					<InputBox
						onChange={(e) => setFname(e.target.value)}
						label="First Name"
						placeholder="Your first name"
					></InputBox>
					<InputBox
						onChange={(e) => setlname(e.target.value)}
						label="Last Name"
						placeholder="Your last name"
					></InputBox>
					<InputBox
						onChange={(e) => setEmail(e.target.value)}
						label="Email"
						placeholder="abc@gmail.com"
					></InputBox>
					<InputBox
						onChange={(e) => setPassword(e.target.value)}
						label="Password"
						placeholder="*******"
					></InputBox>
					<Button disabled={loading} label={loading ? 'Signing up...' : 'Sign up'} onClick={handleSignup}></Button>
					<BottomWarning
						label="Already have an account? "
						linkText="Sign in"
						to="/sign-in"
					></BottomWarning>
				</div>
			</div>
		</div>
	);
};

export default Signup;
