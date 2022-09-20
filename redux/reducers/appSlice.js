import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../config/axiosAPI';

export const login = createAsyncThunk('app/login', async (data) => {
	// try {
	const response = await axiosAPI.post('/auth/login', data);

	if (response.length) {
		response.data;
		return;
	}
	const error = 'Invalid Credentials';
	return error;
	// } catch (error) {
	// 	return error;
	// }
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
	extraReducers: {
		[login.pending]: (state) => {
			state.loading = true;
			state.error = '';
		},
		[login.fulfilled]: (state, action) => {
			state.loading = false;
			state.userToken = action.payload?.access_token;
			state.isLogged = true;
		},
		[login.rejected]: (state) => {
			state.loading = false;
			state.error = 'Invalid credentials';
		},
	},
});

export default appSlice.reducer;
