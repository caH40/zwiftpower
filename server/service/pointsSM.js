import { Result } from '../Model/Result.js';
import { mountainTable, sprintTable } from '../utility/points.js';

export async function putPointsService(
	pointsType,
	sequenceNumber,
	place,
	resultId,
	multiplier = 1
) {
	try {
		console.log({ pointsType, sequenceNumber, place, resultId });
		console.log({ pointsType });
		const elementPoints = `${pointsType}.${sequenceNumber - 1}.points`;
		const elementPlace = `${pointsType}.${sequenceNumber - 1}.place`;

		const { stageId } = await Result.findOne({ _id: resultId });

		if (place !== 'none') {
			const resultCheckingDB = await Result.findOne({ stageId, [elementPlace]: place });
			if (resultCheckingDB)
				throw {
					message: `Внимание!!! Место №${place} уже присвоено райдеру "${resultCheckingDB.name}"`,
				};
		}

		let pointsTable = {};

		if (pointsType === 'pointsMountain') pointsTable = mountainTable;
		if (pointsType === 'pointsSprint') pointsTable = sprintTable;

		let points = pointsTable.find(point => point.place === place)?.points;
		// points = Math.ceil(points * multiplier);

		console.log({ [elementPlace]: place, [elementPoints]: points });
		const resultDB = await Result.findOneAndUpdate(
			{ _id: resultId },
			{ $set: { [elementPlace]: place, [elementPoints]: points } }
		);

		if (!resultDB) throw console.log('не найден результат для обновления');

		const message = `${resultDB.name} присвоено "${place}" место в "${
			pointsType === 'pointsSprint' ? 'Спринте-' + sequenceNumber : 'Горе-' + sequenceNumber
		}"`;

		return { message };
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function putMultiplierService(stageId, sequenceNumber, multiplier, pointsType) {
	try {
		const multiplierPoints = `${pointsType}.${sequenceNumber - 1}.multiplier`;
		const resultsDB = await Result.updateMany(
			{ stageId },
			{ $set: { [multiplierPoints]: multiplier } }
		);
		const nameStandings =
			pointsType === 'pointsMountain' ? 'горного участка №' : 'спринтерского участка №';
		return {
			message: `Установлен множитель для очков x${multiplier} для ${nameStandings}${sequenceNumber}`,
		};
	} catch (error) {
		console.log(error);
		throw error;
	}
}
