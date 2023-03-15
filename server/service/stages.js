import { Result } from '../Model/Result.js';
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
		if (stageDB.quantitySprints !== quantitySprints) {
			await changeSprints(_id, quantitySprints, stageDB.quantitySprints);
		}
		if (stageDB.quantityMountains !== quantityMountains) {
			await changeMountains(_id, quantityMountains, stageDB.quantityMountains);
		}

		return { message: `Изменения в ${number} этапе сохранены!`, data: stageDB };
	} catch (error) {
		console.log(error);
		throw 'Непредвиденная ошибка на сервере';
	}
}

async function changeSprints(stageId, quantitySprintsNew, quantitySprintsOld) {
	let difference = quantitySprintsNew - quantitySprintsOld;
	//увеличение количества спринтов
	if (difference > 0) {
		const sprints = [];
		for (
			let sprintNumber = quantitySprintsOld + 1;
			sprintNumber <= quantitySprintsNew;
			sprintNumber++
		) {
			sprints.push({
				sprint: sprintNumber,
				place: 'none',
			});
		}
		await Result.updateMany(
			{ stageId },
			{
				$push: {
					pointsSprint: { $each: sprints },
				},
			}
		);
	}
	//уменьшение количества спринтов
	if (difference < 0 && quantitySprintsNew != 0) {
		await Result.updateMany(
			{ stageId },
			{
				$push: {
					pointsSprint: { $each: [], $slice: quantitySprintsNew },
				},
			}
		);
	}
	//полная очистка спринтов
	if (difference !== 0 && quantitySprintsNew == 0) {
		await Result.updateMany(
			{ stageId },
			{
				pointsSprint: [],
			}
		);
	}
}

async function changeMountains(stageId, quantityMountainsNew, quantityMountainsOld) {
	let difference = quantityMountainsNew - quantityMountainsOld;
	//увеличение количества спринтов
	if (difference > 0) {
		const mountains = [];
		for (
			let mountainNumber = quantityMountainsOld + 1;
			mountainNumber <= quantityMountainsNew;
			mountainNumber++
		) {
			mountains.push({
				mountain: mountainNumber,
				place: 'none',
			});
		}
		await Result.updateMany(
			{ stageId },
			{
				$push: {
					pointsMountain: { $each: mountains },
				},
			}
		);
	}
	//уменьшение количества спринтов
	if (difference < 0 && quantityMountainsNew != 0) {
		await Result.updateMany(
			{ stageId },
			{
				$push: {
					pointsMountain: { $each: [], $slice: quantityMountainsNew },
				},
			}
		);
	}
	//полная очистка спринтов
	if (difference !== 0 && quantityMountainsNew == 0) {
		await Result.updateMany(
			{ stageId },
			{
				pointsMountain: [],
			}
		);
	}
}

export async function deleteStageService(stageId) {
	try {
		const stageDB = await Stage.findOneAndDelete({ _id: stageId });
		const stagesDB = await Stage.find({ seriesId: stageDB.seriesId });

		return { message: `Этап №${stageDB.number} удалён!`, stages: stagesDB };
	} catch (error) {
		throw error;
	}
}
