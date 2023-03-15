import axios from 'axios';
const serverExpress = process.env.REACT_APP_SERVER_EXPRESS;

export async function postPoints(pointsType, sequenceNumber, place, resultId, multiplier) {
	try {
		const response = await axios.post(
			`${serverExpress}/api/stage/points`,
			{
				pointsType,
				sequenceNumber,
				place,
				resultId,
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
