import { Result } from '../Model/Result.js';

export async function putDisqualificationService(isDisqualification, resultId) {
	try {
		const resultDB = await Result.findOneAndUpdate(
			{ _id: resultId },
			{ $set: { isDisqualification } }
		);

		if (!resultDB) throw { message: 'Не найден райдер для дисквалификации' };

		const message = `Райдер "${resultDB.name}" ${
			isDisqualification ? 'дисквалифицирован!' : 'оправдан, с него снята дисквалификация!'
		}`;
		return { message };
	} catch (error) {
		throw error;
	}
}
