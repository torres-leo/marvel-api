import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../config/axiosAPI';

export const login = createAsyncThunk('app/login', async (data) => {
	try {
		const response = await axiosAPI.post('/auth/login', { ...data });
		// console.log(response.data);
		return response.data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			const errorCredentials = 'Invalid Credentials';
			return errorCredentials;
		}
	}

	// const response = await axiosAPI.post('/auth/login', { ...data });
	// if (response.length) {
	// 	response.data;
	// 	return;
	// }
	// const error = 'Invalid Credentials';
	// return error;
});

const initialState = {
	loading: false,
	userToken: null,
	isLogged: false,
	error: '',
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.loading = true;
				state.error = '';
				return;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false;
				state.userToken = action.payload.access_token;
				state.isLogged = true;
				state.error = null;
				return;
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.error = 'Invalid credentials';
				return;
			});
	},
});

export default appSlice.reducer;
