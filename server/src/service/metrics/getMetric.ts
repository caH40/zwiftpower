import mongoose from 'mongoose';
import { RiderDailyMetricModel } from '../../Model/Metrics.js';

type Params = {
  zwiftId: number;
};

type TResponseDBRacingScore = {
  _id: mongoose.Types.ObjectId;
  date: Date;
  metrics: { racingScore: number };
}[];

/**
 * Получение метрик райдера.
 */
export async function getMetricRacingScoreService({ zwiftId }: Params): Promise<{
  zwiftId: number;
  racingScores: { _id: string; date: Date; racingScore: number }[];
}> {
  const metricsDB: TResponseDBRacingScore = await RiderDailyMetricModel.find(
    { zwiftId },
    { date: true, 'metrics.racingScore': true }
  ).lean();

  // Проверка на случай, если данные не найдены.
  if (!metricsDB.length) {
    return { zwiftId, racingScores: [] };
  }

  // Формирование ответа с необходимой структурой и типами.
  const racingScores = metricsDB.map((metric) => {
    const _id = String(metric._id);
    const racingScore = metric.metrics?.racingScore ?? 0;
    return {
      _id,
      date: metric.date,
      racingScore,
    };
  });

  return { zwiftId, racingScores };
}
