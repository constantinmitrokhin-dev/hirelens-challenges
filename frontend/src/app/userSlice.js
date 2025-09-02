
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const loginUser = createAsyncThunk(
	"user/login",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${BACKEND_URL}/user/login`, data);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response.data.error || err.message);
		}
	}
);

export const registerUser = createAsyncThunk(
	"user/register",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${BACKEND_URL}/user/register`, data);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response.data.error || err.message);
		}
	}
);

const userSlice = createSlice({
	name: "user",
	initialState: { user: null, token: null, loading: false, error: null },
	reducers: {
		logout: (state) => {
			state.user = null;
			state.token = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.token = action.payload.token;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Login failed";
			})
			.addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
			.addCase(registerUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.token = action.payload.token;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Registration failed";
			});
	},
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
