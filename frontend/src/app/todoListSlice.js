
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Fetch all lists
export const fetchTodoLists = createAsyncThunk(
	"todoLists/fetch",
	async (_, { getState }) => {
		const token = getState().user.token;
		const response = await axios.get(`${BACKEND_URL}/todolist/get`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return response.data; // { todoLists: [...] }
	}
);

// Add a new list
export const addTodoList = createAsyncThunk(
	"todoLists/add",
	async (data, { getState }) => {
		const token = getState().user.token;
		const response = await axios.post(`${BACKEND_URL}/todolist/add`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return response.data; // { message, todoList }
	}
);

// Update a list name
export const updateTodoList = createAsyncThunk(
	"todoLists/update",
	async ({ listId, name }, { getState }) => {
		const token = getState().user.token;
		const response = await axios.put(
			`${BACKEND_URL}/todolist/update/${listId}`,
			{ name },
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return response.data.todoList;
	}
);

// Delete a list
export const deleteTodoList = createAsyncThunk(
	"todoLists/delete",
	async (listId, { getState }) => {
		const token = getState().user.token;
		await axios.delete(`${BACKEND_URL}/todolist/delete/${listId}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return listId;
	}
);

const todoListSlice = createSlice({
	name: "todoLists",
	initialState: { lists: [], loading: false, error: null },
	reducers: {
		setTodoLists: (state, action) => {
			state.lists = action.payload || [];
			console.log(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodoLists.pending, (state) => { state.loading = true; })
			.addCase(fetchTodoLists.fulfilled, (state, action) => {
				state.loading = false;
				state.lists = action.payload.todoLists || [];
			})
			.addCase(fetchTodoLists.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(addTodoList.fulfilled, (state, action) => {
				if (action.payload && action.payload.todoList) {
					state.lists.push(action.payload.todoList);
				}
			})
			.addCase(updateTodoList.fulfilled, (state, action) => {
				const index = state.lists.findIndex(l => l.id === action.payload.id);
				if (index !== -1) state.lists[index] = action.payload;
			})
			.addCase(deleteTodoList.fulfilled, (state, action) => {
				state.lists = state.lists.filter(l => l.id !== action.payload);
			});
	},
});

export const { setTodoLists } = todoListSlice.actions;
export default todoListSlice.reducer;
