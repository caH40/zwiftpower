import { Router } from 'express';

import {
	getSeries,
	postSeriesOne,
	postStages,
	getStage,
	putDisqualification,
	putUnderChecking,
	putPenalty,
	putCategory,
	putPoints,
	putMultiplier,
	putSeries,
	postSeries,
	putStage,
	postStage,
	deleteStage,
	getStageResults,
	deleteSeries,
	getRiders,
	getRider,
} from '../controllers/controllers.js';
import { postSchedule, postResults } from '../controllers/uploads.js';
import { authAdmin } from '../middleware/authRole.js';

export const router = new Router();

router.get('/series', authAdmin, getSeries);
router.put('/series', authAdmin, putSeries);
router.post('/series', authAdmin, postSeries);
router.delete('/series', authAdmin, deleteSeries);
router.post('/seriesone', authAdmin, postSeriesOne);

router.get('/riders', authAdmin, getRiders);
router.get('/rider/:zwiftId', authAdmin, getRider);

router.post('/stages', authAdmin, postStages);

router.get('/stage/:stageId', authAdmin, getStage);
router.post('/stage', authAdmin, postStage);
router.delete('/stage', authAdmin, deleteStage);
router.put('/stage', authAdmin, putStage);
router.put('/stage/category', authAdmin, putCategory);
router.put('/stage/points', authAdmin, putPoints);
router.put('/stage/points-multiplier', authAdmin, putMultiplier);

router.get('/stage-result/:stageId', authAdmin, getStageResults);
router.put('/penalty', authAdmin, putPenalty);
router.put('/disqualification', authAdmin, putDisqualification);
router.put('/underchecking', authAdmin, putUnderChecking);

router.post('/schedule', authAdmin, postSchedule);
router.post('/results', authAdmin, postResults);
