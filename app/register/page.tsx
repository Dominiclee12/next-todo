import Link from "next/link";
import React from "react";

const RegisterPage = () => {
	return (
		<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto mt-8">
			<legend className="fieldset-legend">Register</legend>

			<label className="label">Email</label>
			<input type="email" className="input" placeholder="Email" />

			<label className="label">Password</label>
			<input type="password" className="input" placeholder="Password" />

			<button className="btn btn-neutral mt-4">Register</button>
			<p className="mt-2 text-center">
				Already have an account?{" "}
				<Link className="link" href="/login">
					Login now
				</Link>
			</p>
		</fieldset>
	);
};

export default RegisterPage;
