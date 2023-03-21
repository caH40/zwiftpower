import path from 'path';

import { putCategoryService } from '../service/category.js';
import { putDisqualificationService } from '../service/disqualification.js';
import { putPenaltyService } from '../service/penalty.js';
import { putMultiplierService, putPointsService } from '../service/points.js';
import { checkResultService, postResultService } from '../service/results.js';
import { getRiderService, getRidersService } from '../service/riders.js';
import {
	putSeriesService,
	postSeriesService,
	getSeriesService,
	getSeriesOne,
	deleteSeriesService,
} from '../service/series.js';
import { getStageResultsService } from '../service/stage-results.js';
import {
	getStageService,
	getStages,
	putStageService,
	deleteStageService,
	postStageService,
} from '../service/stages.js';
import { putUnderCheckingService } from '../service/underchecking.js';

const __dirname = path.resolve();

export async function getSeries(req, res) {
	try {
		const series = await getSeriesService();
		return res.status(200).json({ message: `Данные серий заездов`, series });
	} catch (error) {
		res.status(400).json({ message: `Ошибка при получении данных серий` });
		console.log(error);
	}
}

export async function postSeriesOne(req, res) {
	try {
		const { seriesId } = req.body;
		const series = await getSeriesOne(seriesId);
		return res.status(200).json({ message: `Данные серии`, series });
	} catch (error) {
		res.status(400).json({ message: `Ошибка при получении данных серии` });
		console.log(error);
	}
}

export async function postStages(req, res) {
	try {
		const { series } = req.body;
		const stages = await getStages(series);
		return res.status(200).json({ message: `Данные этапов серии`, stages });
	} catch (error) {
		res.status(400).json({ message: `Ошибка при получении данных этапов серии` });
		console.log(error);
	}
}

export async function getStage(req, res) {
	try {
		const { stageId } = req.params;
		const stage = await getStageService(stageId);
		return res.status(200).json(stage);
	} catch (error) {
		res.status(400).json(error);
		console.log(error);
	}
}

export async function putDisqualification(req, res) {
	try {
		const { isDisqualification, resultId } = req.body;
		const disqualification = await putDisqualificationService(isDisqualification, resultId);
		return res.status(201).json(disqualification);
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
}

export async function putUnderChecking(req, res) {
	try {
		const { isUnderChecking, resultId } = req.body;
		const underChecking = await putUnderCheckingService(isUnderChecking, resultId);
		return res.status(201).json(underChecking);
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
}

export async function putPenalty(req, res) {
	try {
		const { newPenalty, resultId } = req.body;
		const penalty = await putPenaltyService(newPenalty, resultId);
		return res.status(201).json(penalty);
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
}

export async function putCategory(req, res) {
	try {
		const { newCategory, zwiftId, stageId } = req.body;

		const changedCategory = await putCategoryService(newCategory, zwiftId, stageId);
		return res.status(201).json(changedCategory);
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
}
export async function putPoints(req, res) {
	try {
		const { pointsType, sequenceNumber, place, resultId } = req.body;
		const points = await putPointsService(pointsType, sequenceNumber, place, resultId);
		return res.status(201).json(points);
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
}
export async function putMultiplier(req, res) {
	try {
		const { stageId, sequenceNumber, multiplier, pointsType } = req.body;
		const points = await putMultiplierService(stageId, sequenceNumber, multiplier, pointsType);
		return res.status(201).json(points);
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
}

export async function putSeries(req, res) {
	try {
		const { seriesChanged } = req.body;
		const series = await putSeriesService(seriesChanged);
		return res.status(201).json(series);
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
}

export async function postSeries(req, res) {
	try {
		const { seriesNew } = req.body;
		const series = await postSeriesService(seriesNew);
		return res.status(201).json(series);
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
}
export async function deleteSeries(req, res) {
	try {
		const { seriesId } = req.body;
		const series = await deleteSeriesService(seriesId);
		return res.status(201).json(series);
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
}

export async function putStage(req, res) {
	try {
		const { stageChanged } = req.body;
		const responseStage = await putStageService(stageChanged);
		if (responseStage.status) throw responseStage.message;
		return res.status(201).json({ message: responseStage.message });
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.json({ message: typeof error !== 'string' ? 'Непредвиденная ошибка на сервере' : error });
	}
}
export async function deleteStage(req, res) {
	try {
		const { stageId } = req.body;
		const stages = await deleteStageService(stageId);

		return res.status(200).json(stages);
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
}
export async function postStage(req, res) {
	try {
		const { stageNew } = req.body;
		const stage = await postStageService(stageNew);

		return res.status(200).json(stage);
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
}
export async function getStageResults(req, res) {
	try {
		const { stageId } = req.params;
		const stageResults = await getStageResultsService(stageId);

		return res.status(200).json(stageResults);
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
}
export async function getRiders(req, res) {
	try {
		const riders = await getRidersService();

		return res.status(200).json(riders);
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
}
export async function getRider(req, res) {
	try {
		const { zwiftId } = req.params;
		const rider = await getRiderService(zwiftId);

		return res.status(200).json(rider);
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
}
export async function checkResult(req, res) {
	try {
		const { zwiftId, stageId } = req.params;
		if (!zwiftId || !stageId) return res.status(400);
		const rider = await checkResultService(zwiftId, stageId);

		return res.status(200).json(rider);
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
}
export async function postResult(req, res) {
	try {
		const { result } = req.body;
		const resultSaved = await postResultService(result);

		return res.status(201).json(resultSaved);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
}
