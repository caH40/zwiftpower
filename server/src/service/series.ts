import { Series } from '../Model/Series.js';

export async function getSeriesActualService() {
  const seriesDB = await Series.find({ isFinished: false });
  return { series: seriesDB, message: 'Актуальные Серии' };
}
