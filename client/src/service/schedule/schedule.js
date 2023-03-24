import { uploadFile } from '../upload-file';

import { getScheduleSeries } from './series';
import { getScheduleStages } from './stages';

export async function uploadSchedule(file) {
	try {
		const { binaryFile, fileAttributes } = await uploadFile(file);

		const scheduleSeries = getScheduleSeries(binaryFile);
		const scheduleStages = getScheduleStages(binaryFile);

		return { fileAttributes, scheduleSeries, scheduleStages };
	} catch (error) {
		throw error;
	}
}
