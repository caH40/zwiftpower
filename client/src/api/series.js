import { myAxios } from './axios';
const serverExpress = process.env.REACT_APP_SERVER_EXPRESS;

export async function getSeries() {
	try {
		const response = await myAxios.get(`/api/series`);
		return response;
	} catch (error) {
		throw error;
	}
}

export async function getSeriesOne(seriesId) {
	try {
		const response = await myAxios.post(`${serverExpress}/api/seriesone`, { seriesId });
		return response;
	} catch (error) {
		throw error;
	}
}

export async function putSeries(seriesChanged) {
	try {
		const response = await myAxios({
			url: `/api/series`,
			method: 'put',
			data: {
				seriesChanged,
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
}
export async function postSeries(seriesNew) {
	try {
		const response = await myAxios({
			url: `/api/series`,
			method: 'post',
			data: {
				seriesNew,
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
}
