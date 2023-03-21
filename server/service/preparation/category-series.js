import { Result } from '../../Model/Result.js';
import { Rider } from '../../Model/Rider.js';
import { Stage } from '../../Model/Stage.js';
import { updateCategoryTour } from './category-tour.js';

export async function updateCategorySeries(seriesId, result, categoryCurrent, type) {
	try {
		if (type === 'tour') return await updateCategoryTour(seriesId, result, categoryCurrent, type);

		const riderDB = await Rider.findOne({ zwiftId: result.zwiftId });
		//если аккаунт существует, то категория берется из аккаунта
		if (riderDB) return { category: riderDB.category };

		const stagesDB = await Stage.find({ seriesId });

		for (let stage of stagesDB) {
			const riderZwiftIdDB = await Result.findOne({
				stageId: stage._id,
				zwiftRiderId: result.zwiftId,
			});
			if (riderZwiftIdDB) return { category: riderZwiftIdDB.category };
		}
		//для первой гонки в серии по которой определяются категории
		// const riderDB = await Rider.findOneAndUpdate(
		// 	{ zwiftId: result.zwiftId },
		// 	{ $set: { category: categoryCurrent } }
		// );

		//присваивается категория по результатам текущего заезда тем,
		// у кого первый заезд в текущей серии и нет аккаунта
		return { category: categoryCurrent };
	} catch (error) {
		console.log(error);
	}
}
