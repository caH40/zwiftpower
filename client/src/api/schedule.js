import { myAxios } from './axios';

export async function postSchedule(schedule) {
	try {
		const response = await myAxios({
			url: '/api/schedule',
			method: 'post',
			data: { schedule },
		});
		return response;
	} catch (error) {
		throw error;
	}
}
