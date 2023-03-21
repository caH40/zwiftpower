import { deleteResultService, postResultsService } from '../service/results.js';
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

		return res.status(201).json(resultsSaved);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
}
export async function deleteResult(req, res) {
	try {
		const { resultId } = req.body;
		const result = await deleteResultService(resultId);

		return res.status(201).json(result);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
}
