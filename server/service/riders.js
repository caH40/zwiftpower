import { Result } from '../Model/Result.js';
import { Rider } from '../Model/Rider.js';

export async function getRidersService() {
	try {
		const ridersDB = await Rider.find().populate({ path: 'teamId', select: 'name' });
		return { message: 'Зарегистрированные Райдеры!', riders: ridersDB };
	} catch (error) {
		throw error;
	}
}
export async function getRiderService(zwiftId) {
	try {
		const riderDB = await Rider.findOne({ zwiftId });
		let resultDB = await Result.findOne({
			zwiftRiderId: zwiftId,
			heightInCentimeters: { $exists: true },
			// heightInCentimeters: { $not: { $eq: undefined } },
		});

		if (!resultDB) resultDB = await Result.findOne({ zwiftRiderId: zwiftId });
		//если нет результата у райдера, отправляем данные райдера без доп.параметов
		if (!resultDB) return { message: 'Данные запрашиваемого райдера', rider: riderDB };

		const rider = riderDB.toObject();
		rider.heightInCentimeters = resultDB.heightInCentimeters;
		rider.imageSrc = resultDB.imageSrc;

		return { message: 'Данные запрашиваемого райдера', rider };
	} catch (error) {
		throw error;
	}
}
