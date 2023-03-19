import { Rider } from '../Model/Rider.js';

export async function getRidersService() {
	try {
		const ridersDB = await Rider.find();
		return { message: 'Зарегистрированные Райдеры!', riders: ridersDB };
	} catch (error) {
		throw error;
	}
}
