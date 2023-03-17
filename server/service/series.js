import { Series } from '../Model/Series.js';

export async function getSeriesService(seriesId) {
	try {
		if (seriesId) return await Series.findOne({ _id: seriesId });
		const seriesDB = await Series.find();
		return seriesDB;
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
