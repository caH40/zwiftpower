import { myAxios } from './axios';

export async function postSchedule(schedules) {
	try {
		delete schedules.fileAttributes;
		const response = await myAxios({
			url: '/api/schedule',
			method: 'post',
			data: { schedules },
		});
		return response;
	} catch (error) {
		throw error;
	}
}
