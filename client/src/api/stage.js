import { myAxios } from './axios';

export async function getStages(series) {
	try {
		const response = await myAxios({
			url: '/api/stages',
			method: 'post',
			data: { series },
		});
		return response;
	} catch (error) {
		throw error;
	}
}

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
			url: `/api/stage/${stageId}`,
			method: 'get',
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

export async function postDeleteStage(stageId) {
	try {
		const response = await myAxios({
			url: `/api/stage`,
			method: 'delete',
			data: {
				stageId,
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
}
