import axios from 'axios';
const serverExpress = process.env.REACT_APP_SERVER_EXPRESS;

export async function getStages(series) {
	const result = await axios.post(`${serverExpress}/api/stages`, { series });
	return result.data.stages;
}
