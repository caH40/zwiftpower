import axios from 'axios';
const serverExpress = process.env.REACT_APP_SERVER_EXPRESS;

export async function postStagePenalty(newPenalty, resultId) {
	try {
		const response = await axios.post(
			`${serverExpress}/api/stage/penalty`,
			{ newPenalty, resultId },
			{
				'Content-type': 'application/json',
			}
		);
		return { message: response.data.message, type: 'success' };
	} catch (error) {
		return { message: error.response?.data?.message, type: 'error' };
	}
}
