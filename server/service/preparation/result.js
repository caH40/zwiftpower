import { Rider } from '../../Model/Rider.js';
import { ruleCategory } from '../../utility/category-rule.js';
import { convertTime } from '../../utility/date-convert.js';
import { updateCategoryDB } from './category.js';
import { getSegments } from './segments.js';

export async function prepareResult(result, stage, series) {
	try {
		const { pointsSprint, pointsMountain } = getSegments(stage);
		const categoryCurrent = ruleCategory(
			result.watt,
			result.wattPerKg,
			result.gender,
			series.type
		);

		//обновление категорий во всех результатах серии и в профиле
		const { category } = await updateCategoryDB(series._id, result, categoryCurrent, series.type);

		const time = typeof result.time === 'string' ? convertTime(result.time) : result.time;

		const riderId = await Rider.findOne({ zwiftId: result.zwiftId });
		const teamCurrent = riderId?.teamId;

		result.pointsSprint = pointsSprint;
		result.pointsMountain = pointsMountain;
		result.categoryCurrent = categoryCurrent;
		result.category = category;
		result.time = time;
		result.teamCurrent = teamCurrent;

		return result;
	} catch (error) {
		throw error;
	}
}
