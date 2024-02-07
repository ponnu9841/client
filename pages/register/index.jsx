import Layout from "@/components/layout/layout";
import Link from "next/link";
import { IoEye, IoEyeOff } from "react-icons/io5";
import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import axiosClient from "@/axios/axios-client";

export default function Register() {
	const nameRef = React.useRef(null);
	const emailRef = React.useRef(null);
	const passwordRef = React.useRef(null);

	const [togglePassword, setTogglePassword] = React.useState(true);
	function handleToggle(e) {
		e.preventDefault();
		setTogglePassword(!togglePassword);
	}

	const [emailError, setEmailError] = React.useState(null);
	const [passwordError, setPasswordError] = React.useState(null);
	const [nameError, setNameError] = React.useState(null);

	const [loading, setLoading] = React.useState(false);

	const router = useRouter();
	const dispatch = useDispatch();

	function handleFormSubmit(e) {
		e.preventDefault();
		const email = emailRef.current.value;
		const name = nameRef.current.value;
		const password = passwordRef.current.value;

		const payload = {
			email: email,
			password: password,
			name: name,
		};

		setEmailError(null);
		setPasswordError(null);
		setNameError(null);
		setLoading(true);
		axiosClient
			.post("/register", payload)
			.then((response) => {
				if (response.status == 200) {
					if (response.data.status) {
						router.push("/login");
					} else {
						if (response?.data?.errors) {
							const errors = response?.data?.errors;
							if (errors?.email) {
								setEmailError(errors?.email);
							}
							if (errors?.password) {
								setPasswordError(errors.password);
							}
							if (errors?.name) {
								setNameError(errors.name);
							}
						}
					}
				}
			})
			.finally(() => setLoading(false));
	}

	return (
		<div className="mx-auto max-w-[500px] my-12">
			<div className="text-center mb-3 text-3xl">Register</div>
			<div className="p-3 flex-1 bg-white ">
				<form className="px-10 rounded pt-12 pb-5" onSubmit={handleFormSubmit}>
					<ul className="text-red-500 text-sm mb-2 list-disc ml-5">
						{emailError?.map((item, index) => (
							<li key={index}>{item}</li>
						))}

						{passwordError?.map((item, index) => (
							<li key={index}>{item}</li>
						))}
						{nameError?.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
					<div>
						<input
							type="text"
							placeholder="Name"
							className="input input-bordered input-primary w-full mb-4"
							id="name"
							name="name"
							ref={nameRef}
						/>
						<div className="text-red-500 h-3"></div>
					</div>
					<div>
						<input
							type="email"
							placeholder="Email"
							className="input input-bordered input-primary w-full mb-4"
							id="email"
							name="email"
							ref={emailRef}
						/>
						<div className="text-red-500 h-3"></div>
					</div>

					<div className="mb-4">
						<div className="relative">
							<input
								type={togglePassword ? "password" : "text"}
								placeholder="Password"
								className="input input-bordered input-primary w-full relative rounded-md"
								id="password"
								name="password"
								ref={passwordRef}
							/>
							<div className="absolute right-[10px] top-1/2 text-slate-500 translate-y-[-50%] text-2xl cursor-pointer">
								{togglePassword ? (
									<IoEye onClick={handleToggle} />
								) : (
									<IoEyeOff onClick={handleToggle} />
								)}
							</div>
						</div>
						<div className="text-red-500 h-3"></div>
					</div>

					<div className="flex justify-between items-center">
						<div className="text-slate-500">
							Already a member?{" "}
							<Link href="/login" className="text-primary">
								Sign In
							</Link>
						</div>

						<button
							className="btn btn-primary"
							disabled={loading ? true : false}
						>
							Sign Up
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

Register.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};
