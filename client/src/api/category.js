import { myAxios } from './axios';

export async function putCategory(newCategory, zwiftId, stageId) {
	try {
		const response = await myAxios({
			url: `/api/stage/category`,
			method: 'put',
			data: {
				newCategory,
				zwiftId,
				stageId,
			},
		});

		return response;
	} catch (error) {
		throw error;
	}
}
