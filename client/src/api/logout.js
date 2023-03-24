import axios from 'axios';

const server = process.env.REACT_APP_SERVER_EXPRESS;

export async function postLogout() {
	try {
		const response = await axios({
			method: 'post',
			url: `${server}/api/auth/logout`,
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		console.log(error); // eslint-disable-line no-console
	}
}
