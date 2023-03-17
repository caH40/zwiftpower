import { Router } from 'express';

import {
	getSeries,
	postSeriesOne,
	postStages,
	getStage,
	postZpDisqualification,
	postZpUnderChecking,
	putPenalty,
	putCategory,
	postZpPoints,
	postSeries,
	putStage,
	postStage,
	deleteStage,
	getStageResults,
} from '../controllers/controllers.js';
import { authAdmin } from '../middleware/authRole.js';

export const router = new Router();

router.get('/series', authAdmin, getSeries);
router.post('/series', authAdmin, postSeries);
router.post('/seriesone', authAdmin, postSeriesOne);

router.post('/disqualification', authAdmin, postZpDisqualification);
router.post('/underchecking', authAdmin, postZpUnderChecking);

router.post('/stages', authAdmin, postStages);

router.get('/stage/:stageId', authAdmin, getStage);
router.post('/stage', authAdmin, postStage);
router.delete('/stage', authAdmin, deleteStage);
router.put('/stage', authAdmin, putStage);
router.put('/penalty', authAdmin, putPenalty);
router.put('/stage/category', authAdmin, putCategory);
router.post('/stage/points', authAdmin, postZpPoints);

router.get('/stage-result/:stageId', authAdmin, getStageResults);
