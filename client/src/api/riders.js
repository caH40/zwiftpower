import { myAxios } from './axios';

export async function getRiders() {
	try {
		const response = await myAxios({
			url: '/api/riders',
			method: 'get',
		});
		return response;
	} catch (error) {
		throw error;
	}
}
