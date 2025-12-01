import React from "react";

const Navbar = () => {
	return (
		<header className="bg-gray-200">
			<nav className="flex justify-between items-center max-w-5xl mx-auto p-4">
				<div>
					<a href="#">NextTodo</a>
				</div>
				<ul className="flex items-center gap-4">
					<li>Welcome, Lee</li>
					<li>
						<a href="#">Sign Out</a>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
