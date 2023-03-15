import { Router } from 'express';

import {
	postSeries,
	postSeriesOne,
	postStages,
	postStage,
	postZpDisqualification,
	postZpUnderChecking,
	postZpPenalty,
	postZpCategory,
	postZpPoints,
	postZpSeriesChanged,
	postZpStage,
	postZpStageChanged,
} from '../controllers/controllers.js';
import { authAdmin } from '../middleware/authRole.js';

export const router = new Router();

router.post('/series', authAdmin, postSeries);
router.post('/seriesone', authAdmin, postSeriesOne);
router.post('/stages', authAdmin, postStages);
router.post('/stage', authAdmin, postStage);
router.post('/disqualification', authAdmin, postZpDisqualification);
router.post('/underchecking', authAdmin, postZpUnderChecking);
router.post('/stage/penalty', authAdmin, postZpPenalty);
router.post('/stage/change-category', authAdmin, postZpCategory);
router.post('/stage/points', authAdmin, postZpPoints);
router.post('/series-changed', authAdmin, postZpSeriesChanged);
router.post('/stage', authAdmin, postZpStage);
router.post('/stage-changed', authAdmin, postZpStageChanged);
