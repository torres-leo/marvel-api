import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../config/axiosAPI';

// const initialState = {
// 	favorites: [],
// };

export const favoritesSlice = createSlice({
	name: 'favorites',
	reducers: {},
});

export const { addFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
