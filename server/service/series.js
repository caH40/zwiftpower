import { Result } from '../Model/Result.js';
import { Series } from '../Model/Series.js';
import { Stage } from '../Model/Stage.js';

export async function getSeriesService() {
	try {
		const seriesDB = await Series.find();
		const series = seriesDB.map(seriesOne => seriesOne.toObject());
		for (let seriesOne of series) {
			const stagesDB = await Stage.find({ seriesId: seriesOne._id });
			seriesOne.quantityStages = stagesDB.length;
		}
		return series;
	} catch (error) {
		console.log(error);
	}
}

export async function getSeriesOne(seriesId) {
	try {
		const seriesDB = await Series.findOne({ _id: seriesId }).catch(e => true);
		return seriesDB;
	} catch (error) {
		throw error;
	}
}

export async function putSeriesService({
	_id,
	name,
	dateStart,
	type,
	organizer,
	hasGeneral,
	hasTeams,
	isFinished,
}) {
	try {
		await Series.findOneAndUpdate(
			{ _id },
			{ $set: { name, dateStart, type, organizer, hasGeneral, hasTeams, isFinished } }
		);
		return { message: `Изменения в ${name} сохранены!` };
	} catch (error) {
		throw error;
	}
}

export async function postSeriesService(seriesNew) {
	try {
		await Series.create({ ...seriesNew });
		return { message: `Создана новая Series!` };
	} catch (error) {
		throw error;
	}
}
export async function deleteSeriesService(seriesId) {
	try {
		await Series.findOneAndDelete({ _id: seriesId });
		const stageDB = await Stage.findOne({ seriesId });
		if (!stageDB) return { message: `Удалена Series, этапы серии не найдены!` };

		await Stage.deleteMany({ seriesId });
		await Result.deleteMany({ stageId: stageDB._id });

		return { message: `Удалена Series, этапы и результаты этапов!` };
	} catch (error) {
		throw error;
	}
}
