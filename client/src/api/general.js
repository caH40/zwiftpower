import { myAxios } from './axios';

export async function putGeneralPoints(seriesId) {
	try {
		const response = myAxios({ url: '/api/general', method: 'put', data: { seriesId } });
		return response;
	} catch (error) {
		throw error;
	}
}
