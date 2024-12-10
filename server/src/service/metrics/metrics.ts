import { handleAndLogError } from '../../errors/error.js';
import { getTotalMetrics } from './getTotalMetrics.js';
import { postMetrics } from './postMetrics.js';

/**
 * Сбор с метриками райдера (вес, рост, racing score, ftp, map)
 */
export async function updateRidersDailyMetrics(): Promise<void> {
  try {
    const totalMetrics = await getTotalMetrics();
    await postMetrics({ metrics: totalMetrics });
  } catch (error) {
    handleAndLogError(error);
  }
}
