import axios from 'axios';

const server = process.env.REACT_APP_SERVER_EXPRESS;

export async function checkRequestPassword(token) {
	try {
		const response = await axios({
			method: 'get',
			url: `${server}/api/auth/check-request-password/${token}`,
		});
		return response;
	} catch (error) {
		console.log(error);
	}
}
