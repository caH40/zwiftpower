import { myAxios } from './axios';

export async function getResultStage(seriesId, stageId) {
	try {
		const response = await myAxios({
			url: `/api/stage`,
			method: 'post',
			data: { seriesId, stageId },
		});
		return response;
	} catch (error) {
		throw error;
	}
}

export async function getStage(stageId) {
	try {
		const response = await myAxios({
			url: `/api/stage`,
			method: 'post',
			data: {
				stageId,
			},
		});

		return response;
	} catch (error) {
		throw error;
	}
}

export async function postStage(stageChanged) {
	try {
		const response = await myAxios({
			url: `/api/stage-changed`,
			method: 'post',
			data: {
				stageChanged,
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
}
