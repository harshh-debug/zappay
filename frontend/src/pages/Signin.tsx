import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router";

const Signin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate=useNavigate()
	async function handleSignin() {
		try {
			const res=await axiosClient.post("/user/sign-in", {
				email,
				password,
			});
			if(res.data.success){
				navigate("/dashboard")
			}else{
				console.log(res.data.message)
			}
		} catch (err) {
			console.error(err);
		}
	}
	return (
		<div className="bg-slate-300 h-screen flex justify-center ">
			<div className="flex flex-col justify-center">
				<div className="bg-white flex flex-col justify-center w-80 p-2 h-max px-4 rounded-lg">
					<Heading label="Sign in"></Heading>
					<SubHeading label="Enter your credentials to access your account"></SubHeading>
					<InputBox onChange={(e)=>setEmail(e.target.value)} label="email" placeholder="Your email"></InputBox>
					<InputBox onChange={(e)=>setPassword(e.target.value)} label="Password" placeholder="Your password"></InputBox>
					<Button label="Sign-in" onClick={handleSignin}></Button>
					<BottomWarning
						label="Don't have an account? "
						linkText="Sign up"
						to="/sign-up"
					></BottomWarning>
				</div>
			</div>
		</div>
	);
};

export default Signin;
