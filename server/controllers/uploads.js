import { putGeneralPointsService } from '../service/general/general-update.js';
import { postResultsService } from '../service/protocol.js';
import { postScheduleSeriesService, postScheduleStagesService } from '../service/schedule.js';

export async function postSchedule(req, res) {
	try {
		const { schedules } = req.body;
		const seriesSaved = await postScheduleSeriesService(schedules?.scheduleSeries[0]);
		const stagesSaved = await postScheduleStagesService(
			schedules?.scheduleStages,
			seriesSaved.seriesId
		);

		return res.status(201).json(stagesSaved);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
}
export async function postResults(req, res) {
	try {
		const { results } = req.body;
		const resultsSaved = await postResultsService(results);

		const pointsUpdated = await putGeneralPointsService(resultsSaved.seriesId);
		// console.log({ pointsUpdated, resultsSaved });
		return res.status(201).json(resultsSaved);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
}
