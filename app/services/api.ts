const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTodosAsync() {
	const token = sessionStorage.getItem("token");
	const res = await fetch(`${API_BASE_URL}/Todo`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return await res.json();
}

export async function createTodoAsync(title: string) {
	const token = sessionStorage.getItem("token");
	const res = await fetch(`${API_BASE_URL}/Todo`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ title }),
	});

	return await res.json();
}

export async function toggleCompleteAsync(id: number, completed: boolean) {
	const token = sessionStorage.getItem("token");
	const res = await fetch(`${API_BASE_URL}/Todo/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ completed: !completed }),
	});

	return await res.json();
}

export async function deleteTodoAsync(id: number) {
	const token = sessionStorage.getItem("token");
	const res = await fetch(`${API_BASE_URL}/Todo/${id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

export async function loginAsync(email: string, password: string) {
	const res = await fetch(`${API_BASE_URL}/Auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});

	return await res.json();
}
