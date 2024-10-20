import { Rider } from '../../Model/Rider.js';
import { TMetricsMap } from '../../types/types.interface.js';

type TRiderDBResponse = {
  zwiftId: number;
  height: number;
  weight: number;
  competitionMetrics: { racingScore: number } | null;
}[];

/**
 * Сбор метрик для всех райдеров (вес, рост, racing score, ftp, map) и сохранение в БД.
 * Данные вес, рост, racing score, берутся из коллекции Rider, которая обновляется каждую ночь
 */
export async function getTotalMetrics(): Promise<TMetricsMap> {
  const ridersDB: TRiderDBResponse = await Rider.find(
    {},
    {
      zwiftId: true,
      height: true,
      weight: true,
      'competitionMetrics.racingScore': true,
      _id: false,
    }
  ).lean();

  const metrics: TMetricsMap = new Map(
    ridersDB.map((rider) => [
      rider.zwiftId,
      {
        heightInCentimeters: rider.height,
        weightInGrams: rider.weight,
        racingScore: rider.competitionMetrics?.racingScore || 0,
      },
    ])
  );

  return metrics;
}
