import axios from 'axios';
const baseUrl = '/api/login';

const login = async (credentials) => {
	console.log(credentials, 'CREDENTIALS');
	const response = await axios.post(baseUrl, credentials);
	setTimeout(() => {
		console.log(response.data, 'RESPONSE.DATA 7******');
	}, 10000);
	return response.data;
};

export default { login };
