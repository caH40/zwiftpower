import { Series } from '../../Model/Series.js';

export async function getSeriesService() {
  try {
    const series = await Series.find({ type: 'catchUp' });
    return series;
  } catch (error) {
    throw error;
  }
}
