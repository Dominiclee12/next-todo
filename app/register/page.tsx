"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { registerAsync } from "../services/api";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);

	const handleRegister = async (e: FormEvent) => {
		e.preventDefault();

		const res = await registerAsync(email, password);

		if (res.ok) {
			const data = await res.json();
			const token = data.token;
			setError(false);
			sessionStorage.setItem("token", token);
			router.push("/");
		} else {
			// failed to register
			setError(true);
		}
	};

	return (
		<form onSubmit={handleRegister}>
			<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto mt-8">
				<legend className="fieldset-legend">Register</legend>

				<label className="label">Email</label>
				<input
					type="email"
					className="input"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
				/>

				<label className="label">Password</label>
				<input
					type="password"
					className="input"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button className="btn btn-neutral mt-4">Register</button>
				{error && (
					<div className="alert alert-error">
						<span>Failed to register account.</span>
					</div>
				)}
				<p className="mt-2 text-center">
					Already have an account?{" "}
					<Link className="link" href="/login">
						Login now
					</Link>
				</p>
			</fieldset>
		</form>
	);
};

export default RegisterPage;
