import { myAxios } from './axios';

export async function postAuthorization(dataForm) {
	try {
		const response = await myAxios({
			method: 'post',
			url: '/api/auth/authorization',
			data: { username: dataForm.username, password: dataForm.password },
		});

		return response;
	} catch (error) {
		throw error;
	}
}
