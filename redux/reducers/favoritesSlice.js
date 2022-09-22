import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../config/axiosAPI';

// export const add = createAsyncThunk('favorites/add', async (data) => {
// 	const { token } = data;
// 	const config = {
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Authorization: `Bearer ${token}`,
// 		},
// 	};
// 	const response = await axiosAPI.post('/favorites/', { ...data }, config);
// 	return response.data;
// });

const initialState = {
	favorites: [],
	item: {},
};

export const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		addFavorites: (state, action) => {
			const item = action.payload;
			state.favorites = [...state.favorites, item];
		},
	},
	// extraReducers: (builder) => {
	// 	builder.addCase(add.fulfilled, (state, action) => {
	// 		console.log(action.payload);
	// 	});
	// },
});

export const { addFovorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
