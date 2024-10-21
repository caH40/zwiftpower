import { millisecondsIn90Days } from '../../assets/date.js';
import { RiderDailyMetricModel } from '../../Model/Metrics.js';
import { TRiderDailyMetric } from '../../types/model.interface.js';

type Params = {
  zwiftId: number;
};

/**
 * Получение метрик райдера.
 */
export async function getMetricService({ zwiftId }: Params): Promise<{
  zwiftId: number;
  data: {
    _id: string;
    date: Date;
    racingScore: number;
    weightInGrams: number;
    heightInCentimeters: number;
  }[];
}> {
  const metricsDB: Omit<TRiderDailyMetric, 'zwiftId'>[] = await RiderDailyMetricModel.find(
    { zwiftId },
    {
      zwiftId: false,
    }
  ).lean();

  // Проверка на случай, если данные не найдены.
  if (!metricsDB.length) {
    return { zwiftId, data: [] };
  }

  // Формирование ответа с необходимой структурой и типами.
  const data = metricsDB
    .map((metric) => {
      const _id = String(metric._id);
      const { racingScore, weightInGrams, heightInCentimeters } = metric.metrics;
      return {
        _id,
        date: metric.date,
        racingScore,
        weightInGrams,
        heightInCentimeters,
      };
    })
    .filter((elm) => elm.date.getTime() > Date.now() - millisecondsIn90Days) // Данные за последние 90 дней.
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return { zwiftId, data };
}
