import axios from "axios";

const baseUrl = "http://localhost:8000";
// const baseUrl = "http://127.0.0.1:8000";

const axiosClient = axios.create({
	baseURL: `${baseUrl}/api/user`,
});

axiosClient.interceptors.request.use((config) => {
	// const token = localStorage.getItem("token");
	config.withCredentials = true;
	// config.headers.Authorization = "Bearer " + token;
	return config;
});

axiosClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		try {
			const { response } = error;
			if (response.status == 401) {
				localStorage.removeItem("token");
			}
			throw error;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
);

export default axiosClient;
