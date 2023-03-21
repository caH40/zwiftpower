import { myAxios } from './axios';

export async function postResult(result) {
	try {
		const response = await myAxios({
			url: `/api/stage/result`,
			method: 'post',
			data: {
				result,
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
}

export async function checkRiderResult(zwiftId, stageId) {
	try {
		const response = await myAxios({
			url: `/api/stage/result-check/${zwiftId}/${stageId}`,
			method: 'get',
		});
		return response;
	} catch (error) {
		throw error;
	}
}
