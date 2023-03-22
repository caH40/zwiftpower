//обновление очков для каждого результата
import { Result } from '../../Model/Result.js';
import { Series } from '../../Model/Series.js';
import { Stage } from '../../Model/Stage.js';
import { getResultsWithPenalty } from '../results-penalty.js';

import { points } from './points.js';

export async function putGeneralPointsService(seriesId) {
	try {
		const seriesDB = await Series.findOne({ _id: seriesId });
		const stagesDB = await Stage.find({ seriesId, hasResults: true });

		for (let i = 0; i < stagesDB.length; i++) {
			let resultsDB = await Result.find({
				stageId: stagesDB[i]._id,
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
			let placeW = 0;

			for (let j = 0; j < resultsDB.length; j++) {
				if (resultsDB[j].category === 'A') {
					placeA++;

					await Result.findByIdAndUpdate(
						{ _id: resultsDB[j]._id },
						{ $set: { pointsStage: points[placeA] ? points[placeA] : 0 } }
					);
				}
				if (resultsDB[j].category === 'B') {
					placeB++;
					let resp = await Result.findByIdAndUpdate(
						{ _id: resultsDB[j]._id },
						{ $set: { pointsStage: points[placeB] ? points[placeB] : 0 } },
						{ returnDocument: 'after' }
					);
				}
				if (resultsDB[j].category === 'C') {
					placeC++;
					await Result.findByIdAndUpdate(
						{ _id: resultsDB[j]._id },
						{ $set: { pointsStage: points[placeC] ? points[placeC] : 0 } }
					);
				}
				if (resultsDB[j].category === 'WA') {
					placeWA++;
					await Result.findByIdAndUpdate(
						{ _id: resultsDB[j]._id },
						{ $set: { pointsStage: points[placeWA] ? points[placeWA] : 0 } }
					);
				}
				if (resultsDB[j].category === 'WB') {
					placeWB++;
					await Result.findByIdAndUpdate(
						{ _id: resultsDB[j]._id },
						{ $set: { pointsStage: points[placeWB] ? points[placeWB] : 0 } }
					);
				}
			}
		}
		// //костыль, пока не все девушки зарегистрировались
		// for (let i = 0; i < stagesDB.length; i++) {
		// 	let resultsDB = await Result.find({
		// 		stageId: stagesDB[i]._id,
		// 		categoryCurrent: 'W',
		// 	}).populate('riderId');

		// 	resultsDB = resultsDB.sort((a, b) => a.time - b.time);
		// 	let placeW = 0;
		// 	for (let j = 0; j < resultsDB.length; j++) {
		// 		placeW++;
		// 		await Result.findByIdAndUpdate(
		// 			{ _id: resultsDB[j]._id },
		// 			{ $set: { pointsStage: points[placeW] } }
		// 		);
		// 	}
		// }
		return { message: `Обновлены очки генерального зачета серии ${seriesDB.name}` };
	} catch (error) {
		console.log(error);
	}
}
