import { myAxios } from './axios';
const serverExpress = process.env.REACT_APP_SERVER_EXPRESS;

export async function getSeries() {
	const result = await myAxios.post(`${serverExpress}/api/series`);
	return result.data.series;
}

export async function getSeriesOne(seriesId) {
	const result = await myAxios.post(`${serverExpress}/api/seriesone`, { seriesId });
	return result.data.series;
}

export async function postSeries(seriesChanged) {
	try {
		const response = await myAxios.post(`${serverExpress}/api/series-changed`, {
			seriesChanged,
		});

		return { message: response.data.message, type: 'success' };
	} catch (error) {
		return { message: error.response?.data?.message, type: 'error' };
	}
}
