"use client";

import { FormEvent, useState, useRef } from "react";

interface Todo {
	id: number;
	title: string;
	completed: boolean;
}

export default function Home() {
	const [todos, setTodos] = useState<Todo[]>([
		{ id: 1, title: "Dio Lupa", completed: false },
		{ id: 2, title: "Ellie Beilish", completed: false },
		{ id: 3, title: "Sabrino Gardener", completed: true },
	]);
	const [text, setText] = useState("");
	const [error, setError] = useState(false);
	const idRef = useRef(
		todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1
	);

	const toggleComplete = (id: number) => {
		setTodos((prev) =>
			prev.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault(); // prevent page refresh
		const value = text.trim();

		const newTodo: Todo = {
			id: idRef.current++,
			title: value,
			completed: false,
		};

		if (value.length) {
			setTodos([...todos, newTodo]);
			setText("");
			setError(false);
		} else {
			setError(true);
			console.log("Please fill in the field");
		}
	};

	return (
		<main>
			{/* input */}
			<section className="flex flex-col items-center gap-4 container mx-auto p-4 my-4">
				<h1 className="text-3xl">Add a new task</h1>
				<form className="w-full sm:w-3/4 md:w-2/5" onSubmit={handleSubmit}>
					<div
						className={`join w-full ${
							error && "tooltip tooltip-open tooltip-bottom"
						}`}
						data-tip="Please enter a task"
					>
						<input
							type="text"
							className="input join-item grow"
							placeholder="What do you want to do?"
							onChange={(e) => setText(e.target.value)}
						/>
						<button
							type="submit"
							className="btn btn-primary text-white join-item"
						>
							Add
						</button>
					</div>
				</form>
			</section>

			{/* todo lists */}
			<section className="flex flex-col items-center container mx-auto p-4 my-4">
				<ul className="list rounded-box shadow-md w-full sm:w-3/4 md:w-2/5">
					<li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
						#{todos.filter((todo) => !todo.completed).length} task(s) to be
						completed
					</li>
					{todos.map((todo) => (
						<li className="list-row" key={todo.id}>
							<label
								className={`label ${
									todo.completed && "line-through opacity-25"
								}`}
							>
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
