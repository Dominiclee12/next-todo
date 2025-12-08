"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
	const pathname = usePathname();

	const handleLogout = () => {
		sessionStorage.removeItem("token");
	};

	return (
		<header className="bg-base-300">
			<div className="container mx-auto flex justify-between items-center p-4">
				<Link href="/" className="text-2xl">
					NextTodo
				</Link>
				<nav>
					<ul className="flex gap-8">
						{pathname === "/" && (
							<li>
								<Link href="/login" onClick={handleLogout}>
									Sign out
								</Link>
							</li>
						)}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
