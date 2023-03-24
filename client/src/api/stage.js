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

export async function getResultStage(stageId) {
	try {
		const response = await myAxios({
			url: `/api/stage-result/${stageId}`,
			method: 'get',
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
		});
		return response;
	} catch (error) {
		throw error;
	}
}

export async function putStage(stageChanged) {
	try {
		const response = await myAxios({
			url: '/api/stage',
			method: 'put',
			data: {
				stageChanged,
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
}
export async function postStage(stageNew) {
	try {
		const response = await myAxios({
			url: '/api/stage',
			method: 'post',
			data: {
				stageNew,
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
			url: '/api/stage',
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
