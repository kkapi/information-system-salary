import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SOME_KEY;

export const $API = axios.create({
	baseURL: BASE_URL,
});

const authInterceptor = config => {
  const token = localStorage.getItem('token')
  
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  // config.headers.authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiIiwiaWF0IjoxNzAzNDU5NDkzLCJleHAiOjE3MDM0NjA5MzN9.YyNEI8_wGoTq0RYEQgig_Yd0Grzfu5OsfJ_do1xDaeM`;

	return config;
};

$API.interceptors.request.use(authInterceptor);

export const handleApiError = async error => {
	try {
		const errorMessage =
			error.response?.data?.message || 'An unexpected error occurred.';
		const data = null;
		return { error: errorMessage, data };
	} catch (err) {
		throw new Error('An unexpected error occurred.');
	}
};
