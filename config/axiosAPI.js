import axios from 'axios';

const axiosAPI = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_FAVORITES_URL,
});

export default axiosAPI;
