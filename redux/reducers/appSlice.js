import { createSlice } from '@reduxjs/toolkit';
import axiosAPI from '../../config/axiosAPI';

// const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;

const initialState = {
	userInfo: {},
	userToken: null,
	success: false,
};

export const appSlice = createSlice({
	name: 'App',
	initialState,
	reducers: {
		login: (state, action) => {
			const loginUser = async ({ username, password }) => {
				try {
					if ([username, password].includes('')) return;
					const config = {
						headers: {
							'Content-type': 'application/json',
						},
					};
					const { data } = await axiosAPI.post('/auth/login', { username, password }, config);
					console.log(data);
					localStorage.setItem('userToken', data.access_token);
				} catch (error) {
					console.log(error);
				}
			};
			loginUser(action.payload);
		},
	},
});

export const { login } = appSlice.actions;
export default appSlice.reducer;
