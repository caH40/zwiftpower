import { Series } from '../Model/Series.js';
import { Stage } from '../Model/Stage.js';
import { convertDate } from '../utility/date-convert.js';

export async function postScheduleSeriesService(series) {
	try {
		series.dateStart = convertDate(series.dateStart);
		const seriesDB = await Series.create(series);
		return { message: 'Данные серии сохранены!', seriesId: seriesDB._id };
	} catch (error) {
		throw error;
	}
}
export async function postScheduleStagesService(stages, seriesId) {
	try {
		for (let stage of stages) {
			stage.dateStart = convertDate(stage.dateStart);
			await Stage.create({ ...stage, seriesId });
		}
		return { message: 'Данные этапов сохранены!' };
	} catch (error) {
		throw error;
	}
}
