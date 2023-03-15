import { Series } from '../Model/Series.js';
import { Stage } from '../Model/Stage.js';

export async function getStages(series) {
	try {
		const stagesDB = await Stage.find({ seriesId: series }).populate({
			path: 'seriesId',
			select: 'name',
		});
		return stagesDB;
	} catch (err) {
		console.log(err);
	}
}

export async function getStageService(stageId) {
	try {
		const stageDB = await Stage.findOne({ _id: stageId }).populate({
			path: 'seriesId',
			select: 'name',
		});

		return { message: `Получены данные по этапу №${stageDB.number}`, stage: stageDB };
	} catch (error) {
		throw error;
	}
}

export async function postStageChanged({
	_id,
	number,
	type,
	dateStart,
	timeStart,
	world,
	route,
	routeLink,
	distance,
	ascent,
	laps,
	link,
	quantitySprints,
	quantityMountains,
	registeredRider,
	protocol,
	hasResults,
	needCount,
}) {
	try {
		const stageDB = await Stage.findOneAndUpdate(
			{ _id },
			{
				$set: {
					number,
					type,
					dateStart,
					timeStart,
					world,
					route,
					routeLink,
					distance,
					ascent,
					laps,
					link,
					quantitySprints,
					quantityMountains,
					registeredRider,
					protocol,
					hasResults,
					needCount,
				},
			}
		);
		return { message: `Изменения в ${number} этапе сохранены!`, data: stageDB };
	} catch (error) {
		console.log(error);
		throw 'Непредвиденная ошибка на сервере';
	}
}
