import { Router } from 'express';

import {
	getSeries,
	postSeriesOne,
	postStages,
	getStage,
	postZpDisqualification,
	postZpUnderChecking,
	postZpPenalty,
	postZpCategory,
	postZpPoints,
	postSeries,
	postZpStage,
	postZpStageChanged,
} from '../controllers/controllers.js';
import { authAdmin } from '../middleware/authRole.js';

export const router = new Router();

router.get('/series', authAdmin, getSeries);
router.post('/series', authAdmin, postSeries);
router.post('/seriesone', authAdmin, postSeriesOne);
router.post('/stages', authAdmin, postStages);
router.get('/stage/:stageId', authAdmin, getStage);
router.post('/disqualification', authAdmin, postZpDisqualification);
router.post('/underchecking', authAdmin, postZpUnderChecking);
router.post('/stage/penalty', authAdmin, postZpPenalty);
router.post('/stage/change-category', authAdmin, postZpCategory);
router.post('/stage/points', authAdmin, postZpPoints);
router.post('/stage', authAdmin, postZpStage);
router.post('/stage-changed', authAdmin, postZpStageChanged);
