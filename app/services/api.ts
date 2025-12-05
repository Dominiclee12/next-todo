const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTodosAsync() {
	const res = await fetch(`${API_BASE_URL}/Todo`);

	return await res.json();
}

export async function createTodoAsync(title: string) {
	const res = await fetch(`${API_BASE_URL}/Todo`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ title }),
	});

	return await res.json();
}

export async function toggleCompleteAsync(id: number, completed: boolean) {
	const res = await fetch(`${API_BASE_URL}/Todo/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ completed: !completed }),
	});

	return await res.json();
}

export async function deleteTodoAsync(id: number) {
	const res = await fetch(`${API_BASE_URL}/Todo/${id}`, {
		method: "DELETE",
	});
}
