import path from 'path';

import { putCategoryService } from '../service/category.js';
import { putDisqualificationService } from '../service/disqualification.js';
import { putPenaltyService } from '../service/penalty.js';
import { putMultiplierService, putPointsService } from '../service/pointsSM.js';
import {
  checkResultService,
  deleteResultService,
  deleteResultsService,
  postResultService,
} from '../service/results-stage.js';
import { getRiderService, getRidersService } from '../service/riders.js';
import {
  putSeriesService,
  postSeriesService,
  getSeriesService,
  getSeriesOne,
  deleteSeriesService,
  getSeriesActualService,
} from '../service/series.js';
import { getResultsService } from '../service/results.js';
import {
  getStageService,
  getStages,
  putStageService,
  deleteStageService,
  postStageService,
} from '../service/stages.js';
import { putUnderCheckingService } from '../service/underchecking.js';
import { putGeneralPointsService } from '../service/general/general-update.js';
import { getLogsAdminsService } from '../service/log.js';
import { updateZwiftIdService } from '../service/user.js';

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

export async function getSeriesActual(req, res) {
  try {
    const series = await getSeriesActualService();
    return res.status(200).json(series);
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json(error.response ? { message: error.response?.data } : { message: error.message });
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
    return res.status(400).json({
      message: typeof error !== 'string' ? 'Непредвиденная ошибка на сервере' : error,
    });
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
    const stageResults = await getResultsService(stageId);

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
export async function deleteResults(req, res) {
  try {
    const { stageId } = req.body;
    const resultsDeleted = await deleteResultsService(stageId);

    return res.status(201).json(resultsDeleted);
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
export async function putGeneralPoints(req, res) {
  try {
    const { seriesId } = req.body;
    const generalPoints = await putGeneralPointsService(seriesId);

    return res.status(201).json(generalPoints);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}
// запрос логов по действиям админов(модераторов)
export async function getLogsAdmins(req, res) {
  try {
    const query = req.query;

    const logs = await getLogsAdminsService(query);

    return res.status(200).json(logs);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(error.response ? { message: error.response?.data } : { message: error.message });
  }
}
// обновление zwiftId у пользователя
export async function putUserZwiftId(req, res) {
  try {
    const { userId } = req.params;
    const { zwiftId } = req.body;
    const user = await updateZwiftIdService(userId, zwiftId);

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(error.response ? { message: error.response?.data } : { message: error.message });
  }
}
