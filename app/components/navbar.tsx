import React from "react";

const Navbar = () => {
	return (
		<header className="bg-base-300">
			<div className="container mx-auto flex justify-between items-center p-4">
				<a href="#" className="text-2xl">
					NextTodo
				</a>
				<nav>
					<ul className="flex gap-8">
						<li>Hi, Lee</li>
						<li>
							<a href="#">Sign Out</a>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
