import { postScheduleSeriesService, postScheduleStagesService } from '../service/schedule.js';

export async function postSchedule(req, res) {
	try {
		const { schedules } = req.body;
		const seriesSaved = await postScheduleSeriesService(schedules?.scheduleSeries[0]);
		const stagesSaved = await postScheduleStagesService(
			schedules?.scheduleStages,
			seriesSaved.seriesId
		);

		return res.status(201).json();
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
}
