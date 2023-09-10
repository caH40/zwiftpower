import { Series } from '../../Model/Series.js';

// types
import { SeriesSchema } from '../../types/model.interface.js';

export async function getSeriesService() {
  const series: SeriesSchema[] = await Series.find({ type: 'catchUp' });
  return series;
}
