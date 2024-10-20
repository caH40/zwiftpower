import { TMetrics } from '../../types/model.interface.js';

/**
 * Сбор метриками райдера (вес, рост, racing score, ftp, map) и сохранение в БД.
 * Данные вес, рост, racing score, берутся из коллекции Rider, которая обновляется каждую ночь
 */
export async function postMetrics(): Promise<TMetrics> {}
