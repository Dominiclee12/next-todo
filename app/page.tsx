"use client";

import { FormEvent, useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface Todo {
	id: number;
	title: string;
	completed: boolean;
}

export default function Home() {
	// Properties
	const [todos, setTodos] = useState<Todo[]>([]);

	const [text, setText] = useState("");
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchTodos = async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Todo`);
			const data = await res.json();
			setTodos(data);
		};
		fetchTodos();
	}, []);

	// Methods
	const toggleComplete = async (id: number, completed: boolean) => {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Todo/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ completed: !completed }),
		});
		const data = await res.json();

		setTodos((prev) =>
			prev.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault(); // prevent page refresh
		const value = text.trim();

		if (value.length) {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Todo`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title: value }),
			});
			const data = await res.json();

			setTodos([...todos, data]);
			setText("");
			setError(false);
		} else {
			setError(true);
			console.log("Please fill in the field");
		}
	};

	const handleDelete = (id: number) => {
		setTodos((prev) => prev.filter((todo) => todo.id !== id));
	};

	return (
		<main>
			{/* input */}
			<section className="container mx-auto flex flex-col items-center gap-4 px-4 my-4">
				<h1 className="text-3xl">Add a new task</h1>
				<form className="w-full sm:w-2/5" onSubmit={handleSubmit}>
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
							value={text}
							onChange={(e) => setText(e.target.value)}
						/>
						<button type="submit" className="btn btn-primary join-item">
							Add
						</button>
					</div>
				</form>
			</section>

			{/* todo lists */}
			<section className="container mx-auto px-4 my-4">
				<ul className="w-full sm:w-2/5 mx-auto list rounded-box shadow-md">
					<li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
						#{todos.filter((todo) => !todo.completed).length} task(s) to be
						completed
					</li>
					{todos.map((todo) => (
						<li className="list-row items-center" key={todo.id}>
							<label
								className={`label list-col-grow text-wrap ${
									todo.completed && "line-through opacity-25"
								}`}
							>
								<input
									type="checkbox"
									className="checkbox"
									checked={todo.completed}
									onChange={() => toggleComplete(todo.id, todo.completed)}
								/>
								{todo.title}
							</label>
							<button
								className="btn btn-square btn-ghost"
								onClick={() => handleDelete(todo.id)}
							>
								<FontAwesomeIcon icon={faXmark} />
							</button>
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}
