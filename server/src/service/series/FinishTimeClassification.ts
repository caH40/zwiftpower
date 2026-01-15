import { SeriesRepository } from '../../repositories/Series.js';
import { getOrThrow } from '../../utils/getOrThrow.js';

// types
import { TStageResult } from '../../types/model.interface.js';
import { TRaceSeriesCategories } from '../../types/types.interface.js';

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
    if (results.length === 0) {
      return results;
    }

    // Порог временного разрыва переводится из секунд в миллисекунды.
    const thresholdMs = timeGapThresholdSeconds * 1000;

    // Коллекция текущего лидера финишной группы и предыдущего участника по категориям.
    const leadersInCategories = new Map<
      TRaceSeriesCategories,
      { leader: number; prev: number }
    >();

    for (const result of results) {
      const currentCategory = result.category;

      // Проверка, что категория не null.
      const checkedCategory = this.ensureCategory(currentCategory, result);

      // Получение времен лидера и предыдущего участника для категории из текущего результата.
      const categoryTime = leadersInCategories.get(checkedCategory);

      // Время из текущего результата.
      const currentTime = result.activityData.durationInMilliseconds;

      if (!categoryTime) {
        // Если нет данных, то участник из результата является лидером и предыдущим участником для текущей группы.
        leadersInCategories.set(checkedCategory, {
          leader: currentTime,
          prev: currentTime,
        });

        // Установка классификационного времени.
        result.finishTimeClassification = {
          timeInMilliseconds: currentTime,
          gapToLeaderInMilliseconds: 0,
        };

        continue;
      }

      // Разрыв во времени между текущим райдером и предыдущим.
      const gapToPrev = currentTime - categoryTime.prev;

      if (gapToPrev <= thresholdMs) {
        // Результат относится к текущей финишной группе.
        result.finishTimeClassification = {
          // Классификационное время равно времени лидера группы.
          timeInMilliseconds: categoryTime.leader,

          // Реальный разрыв считается относительно лидера группы.
          gapToLeaderInMilliseconds: currentTime - categoryTime.leader,
        };

        // В коллекции категорий в текущей категории обновляется предыдущий результат.
        categoryTime.prev = currentTime;
      } else {
        // Для текущей категории начинается новая финишная группа.
        result.finishTimeClassification = {
          timeInMilliseconds: currentTime,
          gapToLeaderInMilliseconds: 0,
        };

        // Текущий райдер становится лидером новой финишной группы.
        categoryTime.leader = currentTime;
        categoryTime.prev = currentTime;
      }
    }

    return results;
  }
  // const leadersInCategories = new Map<
  //   TRaceSeriesCategories,
  //   { leader: number; prev: number }
  // >([[checkedCategory, { leader: firstGroupLeaderTime, prev: firstGroupLeaderTime }]]);

  // Первый результат всегда является лидером своей группы.
  // results[0].finishTimeClassification = {
  //   timeInMilliseconds: firstGroupLeaderTime,
  //   gapToLeaderInMilliseconds: 0,
  // };

  private ensureCategory(
    category: TRaceSeriesCategories | null,
    result: TStageResult
  ): TRaceSeriesCategories {
    if (!category) {
      throw new Error(
        `У райдера в результате _id: "${result._id}" на этапе №${result.order} серии не установлена категория для серии ${result.series}`
      );
    }
    return category;
  }
}

// for (let i = 1; i < results.length; i++) {
//   const prevTime = results[i - 1].activityData.durationInMilliseconds;
//   const currentTime = results[i].activityData.durationInMilliseconds;

//   const currentCategory = results[i].category;

//   // Проверка, что категория не null.
//   const checkedCategory = this.ensureCategory(currentCategory, results[i]);

//   let currentCategoryLeaderTime = leadersInCategories.get(checkedCategory);

//   // Если лидера нет для данной категории, то текущий райдер лидер в данной категории.
//   if (!currentCategoryLeaderTime) {
//     currentCategoryLeaderTime = currentTime;
//   }

//   // Разрыв во времени между текущим райдером и предыдущим.
//   const gapToPrev = currentTime - prevTime;

//   if (gapToPrev < thresholdMs) {
//     // Результат относится к текущей финишной группе.
//     results[i].finishTimeClassification = {
//       // Классификационное время равно времени лидера группы.
//       timeInMilliseconds: groupLeaderTime,

//       // Реальный разрыв считается относительно лидера группы.
//       gapToLeaderInMilliseconds: currentTime - groupLeaderTime,
//     };
//   } else {
//     // Начинается новая финишная группа.
//     groupLeaderTime = currentTime;

//     // Текущий райдер становится лидером новой группы.
//     results[i].finishTimeClassification = {
//       timeInMilliseconds: groupLeaderTime,
//       gapToLeaderInMilliseconds: 0,
//     };
//   }
