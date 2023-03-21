import { Result } from '../Model/Result.js';
import { Stage } from '../Model/Stage.js';

import { convertTime } from '../utility/date-convert.js';
import { getSegments } from './preparation/segments.js';

export async function checkResultService(zwiftId, stageId) {
	try {
		const resultDB = await Result.findOne({ zwiftRiderId: zwiftId, stageId });
		if (resultDB)
			throw {
				message: `Результат ${resultDB.name} уже есть в протоколе данного Этапа!`,
				hasResult: true,
			};
		return { message: 'Отсутствует результат райдера в данном Этапе', hasResult: false };
	} catch (error) {
		throw error;
	}
}

export async function postResultService({
	stageId,
	name,
	zwiftId: zwiftRiderId,
	time,
	weightInGrams,
	watt,
	wattPerKg,
	heightInCentimeters,
	avgHeartRate,
	category,
	categoryCurrent,
	imageSrc,
	gender,
}) {
	try {
		const resultDBCheck = await Result.findOne({ zwiftRiderId, stageId });
		if (resultDBCheck)
			throw {
				message: `Результат ${resultDBCheck.name} уже есть в протоколе данного Этапа!`,
				hasResult: true,
			};

		const stageDB = await Stage.findOne({ _id: stageId });
		const { pointsSprint, pointsMountain } = getSegments(stageDB);

		time = convertTime(time);

		const resultDB = await Result.create({
			stageId,
			name,
			zwiftRiderId,
			time,
			weightInGrams,
			watt,
			wattPerKg,
			heightInCentimeters,
			avgHeartRate,
			category,
			categoryCurrent,
			imageSrc,
			gender,
			pointsSprint,
			pointsMountain,
			addedManually: true,
		});

		return { message: 'Результат сохранён!' };
	} catch (error) {
		throw error;
	}
}

export async function deleteResultService(resultId) {
	try {
		const resultDB = await Result.findOneAndDelete({ _id: resultId });
		if (!resultDB) throw { message: 'Результат не найден!' };
		return { message: 'Результат удалён!' };
	} catch (error) {
		throw error;
	}
}

export async function deleteResultsService(stageId) {
	try {
		const stageDB = await Stage.findOneAndUpdate(
			{ _id: stageId },
			{ $set: { hasResults: false } }
		);
		await Result.deleteMany({ stageId });
		return { message: `Удалены все результаты Этапа №${stageDB.number}!` };
	} catch (error) {
		throw error;
	}
}
