import axios from 'axios';
const serverExpress = process.env.REACT_APP_SERVER_EXPRESS;

export async function postCategory(newCategory, zwiftId, stageId) {
	try {
		const response = await axios.post(
			`${serverExpress}/api/stage/change-category`,
			{
				newCategory,
				zwiftId,
				stageId,
			},
			{
				'Content-type': 'application/json',
			}
		);

		return { message: response.data.message, type: 'success' };
	} catch (error) {
		return { message: error.response?.data?.message, type: 'error' };
	}
}
