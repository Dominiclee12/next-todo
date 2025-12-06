"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { loginAsync } from "../services/api";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const res = await loginAsync(email, password);
		const token = res.token;
		console.log("Token: " + token);

		if (token) {
			sessionStorage.setItem("token", token);
			router.push("/");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto mt-8">
				<legend className="fieldset-legend">Login</legend>

				<label className="label">Email</label>
				<input
					type="email"
					className="input"
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
				/>

				<label className="label">Password</label>
				<input
					type="password"
					className="input"
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>

				<button className="btn btn-neutral mt-4">Login</button>
				<p className="mt-2 text-center">
					Don't have an account?{" "}
					<Link className="link" href="/register">
						Register now
					</Link>
				</p>
			</fieldset>
		</form>
	);
}
