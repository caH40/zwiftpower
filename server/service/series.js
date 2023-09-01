import { Series } from '../Model/Series.js';

export async function getSeriesActualService() {
  try {
    const seriesDB = await Series.find({ isFinished: false });
    return { series: seriesDB, message: 'Актуальные Серии' };
  } catch (error) {
    throw error;
  }
}
