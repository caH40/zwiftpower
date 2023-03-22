//обновление очков для каждого результата
import { Result } from '../../Model/Result.js';
import { Series } from '../../Model/Series.js';
import { Stage } from '../../Model/Stage.js';
import { getResultsWithPenalty } from '../results-penalty.js';

import { points } from './points.js';

export async function putGeneralPointsService(seriesId) {
	try {
		const seriesDB = await Series.findOne({ _id: seriesId });
		const seriesFinishedDB = await Series.findOne({ _id: seriesId, isFinished: true });

		if (seriesFinishedDB)
			throw { message: 'Серия завершена, нельзя обновить генеральный зачёт!' };
		const stagesDB = await Stage.find({ seriesId, hasResults: true });

		for (let stage of stagesDB) {
			let resultsDB = await Result.find({
				stageId: stage._id,
				// riderId: { $ne: undefined },
			}).populate('riderId');

			const hasPenalty = resultsDB.find(
				result => result.penalty.powerUp !== 0 || result.isDisqualification === true
			);
			if (hasPenalty) resultsDB = getResultsWithPenalty(resultsDB);

			//что делать если время одинаковое
			resultsDB = resultsDB.sort((a, b) => a.time - b.time);

			let placeA = 0;
			let placeB = 0;
			let placeC = 0;
			let placeWA = 0;
			let placeWB = 0;

			for (let result of resultsDB) {
				if (result.category === 'A') {
					placeA++;
					await Result.findByIdAndUpdate(
						{ _id: result._id },
						{ $set: { pointsStage: points[placeA] ? points[placeA] : 0 } }
					);
				}
				if (result.category === 'B') {
					placeB++;
					await Result.findByIdAndUpdate(
						{ _id: result._id },
						{ $set: { pointsStage: points[placeB] ? points[placeB] : 0 } },
						{ returnDocument: 'after' }
					);
				}
				if (result.category === 'C') {
					placeC++;
					await Result.findByIdAndUpdate(
						{ _id: result._id },
						{ $set: { pointsStage: points[placeC] ? points[placeC] : 0 } }
					);
				}
				if (result.category === 'WA') {
					placeWA++;
					await Result.findByIdAndUpdate(
						{ _id: result._id },
						{ $set: { pointsStage: points[placeWA] ? points[placeWA] : 0 } }
					);
				}
				if (result.category === 'WB') {
					placeWB++;
					await Result.findByIdAndUpdate(
						{ _id: result._id },
						{ $set: { pointsStage: points[placeWB] ? points[placeWB] : 0 } }
					);
				}
			}
		}
		return { message: `Обновлены очки генерального зачета серии ${seriesDB.name}` };
	} catch (error) {
		throw error;
	}
}
