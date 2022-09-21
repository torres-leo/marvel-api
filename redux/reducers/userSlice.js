import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../config/axiosAPI';

export const login = createAsyncThunk('user/login', async (data) => {
	if ([data].includes('')) return;
	const response = await axiosAPI.post('/auth/login', { ...data });
	return response.data;
});

const initialState = {
	loading: false,
	userToken: null,
	isLogged: false,
	error: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			state.isLogged = !state.isLogged;
			state.userToken = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false;
				state.userToken = action.payload.access_token;
				state.isLogged = true;
				state.error = null;
			})
			.addCase(login.rejected, (state) => {
				state.loading = false;
				state.error = 'Invalid credentials';
			});
	},
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
