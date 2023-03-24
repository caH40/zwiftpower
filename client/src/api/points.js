import { myAxios } from './axios';

export async function putPoints(pointsType, sequenceNumber, place, resultId) {
	try {
		const response = await myAxios({
			url: '/api/stage/points',
			method: 'put',
			data: {
				pointsType,
				sequenceNumber,
				place,
				resultId,
			},
		});

		return response;
	} catch (error) {
		throw error;
	}
}
export async function putMultiplier(stageId, sequenceNumber, multiplier, pointsType) {
	try {
		const response = await myAxios({
			url: '/api/stage/points-multiplier',
			method: 'put',
			data: {
				stageId,
				sequenceNumber,
				multiplier,
				pointsType,
			},
		});

		return response;
	} catch (error) {
		throw error;
	}
}
