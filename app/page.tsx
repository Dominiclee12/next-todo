"use client";

import { useState } from "react";

interface Todo {
	id: number;
	title: string;
	completed: boolean;
}

export default function Home() {
	const [todos, setTodos] = useState([
		{ id: 1, title: "Dio Lupa", completed: false },
		{ id: 2, title: "Ellie Beilish", completed: false },
		{ id: 3, title: "Sabrino Gardener", completed: true },
	]);

	const toggleComplete = (id: number) => {
		setTodos((prev) =>
			prev.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	return (
		<main>
			{/* input */}
			<section className="flex flex-col items-center gap-4 max-w-5xl mx-auto p-4 my-4">
				<h2 className="text-3xl">Add a new task</h2>
				<form className="w-1/2 mx-auto">
					<div className="join w-full">
						<input
							type="text"
							className="input join-item grow"
							placeholder="What do you want to do?"
						/>
						<button className="btn btn-primary text-white join-item">
							Add
						</button>
					</div>
				</form>
			</section>

			{/* todo lists */}
			<section className="max-w-5xl mx-auto p-4 my-4">
				<ul className="list w-1/2 mx-auto rounded-box shadow-md">
					<li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
						#{todos.filter((todo) => !todo.completed).length} task(s) to be
						completed
					</li>
					{todos.map((todo) => (
						<li className="list-row" key={todo.id}>
							<label className={`label ${todo.completed && "line-through"}`}>
								<input
									type="checkbox"
									className="checkbox"
									checked={todo.completed}
									onChange={() => toggleComplete(todo.id)}
								/>
								{todo.title}
							</label>
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}
