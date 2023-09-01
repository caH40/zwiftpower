import { Result } from '../Model/Result.js';
import { Series } from '../Model/Series.js';
import { Stage } from '../Model/Stage.js';

export async function getSeriesActualService() {
  try {
    const seriesDB = await Series.find({ isFinished: false });
    return { series: seriesDB, message: 'Актуальные Серии' };
  } catch (error) {
    throw error;
  }
}
