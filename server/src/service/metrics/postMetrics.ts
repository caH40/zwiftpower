import { errorHandler } from '../../errors/error.js';
import { RiderDailyMetricModel } from '../../Model/Metrics.js';
import { TMetricsMap } from '../../types/types.interface.js';

/**
 * Добавление ежедневных метрик райдеров в БД.
 */
export async function postMetrics({ metrics }: { metrics: TMetricsMap }): Promise<void> {
  const now = new Date();

  // Вычисляем дату за прошлый день и устанавливаем время на 23:00.
  // Дата берется за прошлый день, так как обновление данных происходит ночью после 00:00.
  const yesterdayAt23 = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1,
    23,
    0,
    0
  );

  const requests = Array.from(metrics.entries()).map(async ([zwiftId, value]) => {
    try {
      // Проверяем, существует ли запись за прошлый день.
      // Запись может создаваться после финиша в Эвенте.
      const existingMetric = await RiderDailyMetricModel.findOne({
        zwiftId,
        date: yesterdayAt23,
      });

      // Если запись уже существует, ничего не делаем.
      if (existingMetric) {
        return null;
      }

      // Если записи нет, создаем новую метрику
      await RiderDailyMetricModel.create({
        zwiftId,
        date: yesterdayAt23,
        metrics: {
          heightInCentimeters: value.heightInCentimeters,
          weightInGrams: value.weightInGrams,
          racingScore: value.racingScore,
        },
      });
    } catch (error) {
      errorHandler(error);
    }
  });

  await Promise.all(requests);
}
