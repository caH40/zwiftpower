import path from 'path';

import { changeCategory } from '../service/category.js';
import { setDisqualification } from '../service/disqualification.js';
import { setPenalty } from '../service/penalty.js';
import { setPoints } from '../service/points.js';
import { postSeriesService, getSeriesService, getSeriesOne } from '../service/series.js';
import {
	getStageService,
	getStages,
	postStageChanged,
	deleteStageService,
} from '../service/stages.js';
import { setUnderChecking } from '../service/underchecking.js';

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

export async function postZpDisqualification(req, res) {
	try {
		const { isDisqualification, resultId } = req.body;

		const disqualification = await setDisqualification(isDisqualification, resultId);

		return res.status(201).json({ message: disqualification.message });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ message: `Ошибка при дисквалификации` });
	}
}

export async function postZpUnderChecking(req, res) {
	try {
		const { isUnderChecking, resultId } = req.body;

		const underChecking = await setUnderChecking(isUnderChecking, resultId);

		return res.status(201).json({ message: underChecking.message });
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.json({ message: `Ошибка при постановке под наблюдение за превышение категории!` });
	}
}

export async function postZpPenalty(req, res) {
	try {
		const { newPenalty, resultId } = req.body;

		const penalty = await setPenalty(newPenalty, resultId);

		return res.status(201).json({ message: penalty.message });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ message: `Ошибка при начислении штрафных балов` });
	}
}

export async function postZpCategory(req, res) {
	try {
		const { newCategory, zwiftId, stageId } = req.body;

		const changedCategory = await changeCategory(newCategory, zwiftId, stageId);

		if (changedCategory.status) throw changedCategory.message;

		return res.status(201).json({ message: changedCategory.message });
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.json({ message: typeof error !== 'string' ? 'Непредвиденная ошибка на сервере' : error });
	}
}
export async function postZpPoints(req, res) {
	try {
		const { pointsType, sequenceNumber, place, resultId, multiplier } = req.body;
		const points = await setPoints(pointsType, sequenceNumber, place, resultId, multiplier);
		if (points.status) throw points.message;
		return res.status(201).json({ message: points.message });
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.json({ message: typeof error !== 'string' ? 'Непредвиденная ошибка на сервере' : error });
	}
}

export async function postSeries(req, res) {
	try {
		const { seriesChanged } = req.body;
		const series = await postSeriesService(seriesChanged);
		return res.status(201).json(series);
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.json({ message: typeof error !== 'string' ? 'Непредвиденная ошибка на сервере' : error });
	}
}

export async function postZpStage(req, res) {
	try {
		const { stageId } = req.body;
		const stage = await getStage(stageId);
		if (stage.status) throw stage.message;
		return res.status(201).json({ ...stage });
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.json({ message: typeof error !== 'string' ? 'Непредвиденная ошибка на сервере' : error });
	}
}

export async function postZpStageChanged(req, res) {
	try {
		const { stageChanged } = req.body;
		const responseStage = await postStageChanged(stageChanged);
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
