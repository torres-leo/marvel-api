import axios from 'axios';

const axiosClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosClient.interceptors.request.use((request) => {
	request.params = {
		...request.params,
		ts: 1,
		apikey: process.env.NEXT_PUBLIC_API_KEY,
		hash: process.env.NEXT_PUBLIC_API_HASH,
	};
	return request;
});

export default axiosClient;
