import { myAxios } from './axios';
const serverExpress = process.env.REACT_APP_SERVER_EXPRESS;

export async function getSeries() {
	try {
		const response = await myAxios.post(`${serverExpress}/api/series`);
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

export async function postSeries(seriesChanged) {
	try {
		const response = await myAxios.post(`${serverExpress}/api/series-changed`, {
			seriesChanged,
		});
		return response;
	} catch (error) {
		throw error;
	}
}
