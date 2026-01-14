import { SeriesRepository } from '../../repositories/Series.js';
import { getOrThrow } from '../../utils/getOrThrow.js';

// types
import { TStageResult } from '../../types/model.interface.js';

/**
 * Пороговое значение разрыва для правила одинакового времени при групповом финише.
 */
export class FinishTimeClassification {
  constructor(private seriesId: string) {
    this.seriesId = seriesId;
  }

  async set(results: TStageResult[]): Promise<TStageResult[]> {
    const seriesRepository = new SeriesRepository();

    // Получаем необходимые параметры из серии для расчета.
    const { timeGapThresholdSeconds } = await getOrThrow(
      seriesRepository.getById(this.seriesId),
      `Не найдена серия с _id: "${this.seriesId}"`
    );

    // Если допустимый временной разрыв на финише не установлен или равен нулю в настройках серии.
    if (!timeGapThresholdSeconds) {
      return results.map((r) => ({
        ...r,
        finishTimeClassification: null,
      }));
    }

    return this.setFinishTimeClassification(results, timeGapThresholdSeconds);
  }

  /**
   * Устанавливает классификационное финишное время для результатов этапа
   * на основе порогового значения временного разрыва между участниками.
   *
   * Если разрыв между соседними райдерами меньше установленного порога,
   * они объединяются в одну финишную группу и получают одинаковое
   * классификационное время — время лидера этой группы.
   *
   * При этом сохраняется реальный временной разрыв каждого райдера
   * относительно лидера своей группы.
   */
  private setFinishTimeClassification(
    results: TStageResult[],
    timeGapThresholdSeconds: number
  ): TStageResult[] {
    if (results.length === 0) return results;

    // Порог временного разрыва переводится из секунд в миллисекунды.
    const thresholdMs = timeGapThresholdSeconds * 1000;

    // Время лидера текущей финишной группы.
    let groupLeaderTime = results[0].activityData.durationInMilliseconds;

    // Первый результат всегда является лидером своей группы.
    results[0].finishTimeClassification = {
      timeInMilliseconds: groupLeaderTime,
      gapToLeaderInMilliseconds: 0,
    };

    for (let i = 1; i < results.length; i++) {
      const prevTime = results[i - 1].activityData.durationInMilliseconds;
      const currentTime = results[i].activityData.durationInMilliseconds;

      // Разрыв во времени между текущим райдером и предыдущим.
      const gapToPrev = currentTime - prevTime;

      if (gapToPrev < thresholdMs) {
        // Результат относится к текущей финишной группе.
        results[i].finishTimeClassification = {
          // Классификационное время равно времени лидера группы.
          timeInMilliseconds: groupLeaderTime,
          // Реальный разрыв считается относительно лидера группы.
          gapToLeaderInMilliseconds: currentTime - groupLeaderTime,
        };
      } else {
        // Начинается новая финишная группа.
        groupLeaderTime = currentTime;

        // Текущий райдер становится лидером новой группы.
        results[i].finishTimeClassification = {
          timeInMilliseconds: groupLeaderTime,
          gapToLeaderInMilliseconds: 0,
        };
      }
    }

    return results;
  }
}
