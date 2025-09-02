
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchTasks = createAsyncThunk(
	"tasks/fetch",
	async (listId, { getState }) => {
		const token = getState().user.token;
		const response = await axios.get(`${BACKEND_URL}/task/get`, {
			headers: { Authorization: `Bearer ${token}` },
			params: { todo_list_id: listId },
		});
		return { listId, tasks: response.data.tasks || [] };
	}
);

export const addTask = createAsyncThunk(
	"tasks/add",
	async ({ listId, task }, { getState }) => {
		const token = getState().user.token;
		const response = await axios.post(
			`${BACKEND_URL}/task/add`,
			{ todo_list_id: listId, name: task.title },
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return { listId, task: response.data.task };
	}
);

export const updateTask = createAsyncThunk(
	"tasks/update",
	async ({ listId, taskId, updates }, { getState }) => {
		const token = getState().user.token;
		const response = await axios.put(
			`${BACKEND_URL}/task/update/${taskId}`,
			{ name: updates.title, is_completed: updates.is_completed },
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return { listId, task: response.data.task };
	}
);

export const deleteTask = createAsyncThunk(
	"tasks/delete",
	async ({ listId, taskId }, { getState }) => {
		const token = getState().user.token;
		await axios.delete(`${BACKEND_URL}/task/delete/${taskId}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return { listId, taskId };
	}
);

const taskSlice = createSlice({
	name: "tasks",
	initialState: { tasksByList: {}, loading: false, error: null },
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTasks.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state.loading = false;
				state.tasksByList[action.payload.listId] = action.payload.tasks;
			})
			.addCase(fetchTasks.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(addTask.fulfilled, (state, action) => {
				if (!state.tasksByList[action.payload.listId])
					state.tasksByList[action.payload.listId] = [];
				state.tasksByList[action.payload.listId].push(action.payload.task);
			})
			.addCase(updateTask.fulfilled, (state, action) => {
				const tasks = state.tasksByList[action.payload.listId] || [];
				const index = tasks.findIndex((t) => t.id === action.payload.task.id);
				if (index !== -1) tasks[index] = action.payload.task;
			})
			.addCase(deleteTask.fulfilled, (state, action) => {
				const tasks = state.tasksByList[action.payload.listId] || [];
				state.tasksByList[action.payload.listId] = tasks.filter(
					(t) => t.id !== action.payload.taskId
				);
			});
	},
});

export default taskSlice.reducer;
