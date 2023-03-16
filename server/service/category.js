import { Result } from '../Model/Result.js';
import { Rider } from '../Model/Rider.js';
import { Stage } from '../Model/Stage.js';

export async function putCategoryService(newCategory, zwiftId, stageId) {
	try {
		await Rider.findOneAndUpdate(
			{ zwiftId: zwiftId },
			{ $set: { category: newCategory } },
			{ returnDocument: 'after' }
		);

		const stageDB = await Stage.findOne({ _id: stageId });
		if (!stageDB) throw { message: `Не найден ни один этап серии` };

		const stagesDB = await Stage.find({ seriesId: stageDB.seriesId, hasResults: true });
		if (!stagesDB.length) throw { message: `Не найден ни один этап серии с результатами` };

		const resultDB = await Result.findOne({ zwiftRiderId: zwiftId });

		for (let i = 0; i < stagesDB.length; i++) {
			await Result.findOneAndUpdate(
				{ stageId: stagesDB[i]._id, zwiftRiderId: zwiftId },
				{ $set: { category: newCategory } }
			);
		}

		const message = `Успех! Райдеру "${resultDB.name}" изменена категория с "${resultDB.category}" на "${newCategory}"`;

		return { message };
	} catch (error) {
		console.log(error);
		throw 'Непредвиденная ошибка на сервере';
	}
}
