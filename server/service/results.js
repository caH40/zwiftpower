import { Result } from '../Model/Result.js';
import { Series } from '../Model/Series.js';
import { Stage } from '../Model/Stage.js';
import { convertTime } from '../utility/date-convert.js';
import { prepareResult } from './preparation/result.js';
import { getSegments } from './preparation/segments.js';

export async function postResultsService(results) {
	try {
		const seriesName = results.fileAttributes.name.split('_')[0];
		const stageNumber = results.fileAttributes.name.split('_Stage-')[1].split('.')[0];

		const seriesDB = await Series.findOne({ name: seriesName });
		if (!seriesDB._id) throw { message: wrongName };

		const stageDB = await Stage.findOne({ seriesId: seriesDB._id, number: stageNumber });
		if (!stageDB._id) throw { message: wrongName };
		if (stageDB.hasResults) throw { message: existsResults };

		for (let result of results.results) {
			result = await prepareResult(result, stageDB, seriesDB);
			const resultsDB = await Result.create({ stageId: stageDB._id, ...result }).catch(error => {
				throw { message: fault };
			});
		}

		await Stage.findOneAndUpdate(
			{ seriesId: seriesDB._id, number: stageNumber },
			{ $set: { hasResults: true } }
		);

		return {
			message: 'Протокол с результатами сохранён!',
			ids: { stageId: stageDB._id, seriesId: seriesDB._id },
		};
	} catch (error) {
		throw error;
	}
}

//сообщения о ошибках
const wrongName = 'Не найдена Series, проверьте правильность наименования файла!';
const existsResults = 'Результаты данного этапа уже есть на сервере!';
const fault = 'Ошибка при сохранении некоторых результатов.';

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
