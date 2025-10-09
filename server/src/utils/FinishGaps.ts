// types
import { TGapsInCategories } from '../types/model.interface';
import { TRaceSeriesCategories, TFinishGapsGetters } from '../types/types.interface';

/**
 * Класс расчета временных отставаний (гэпов) в абсолютном и категорийном зачётах.
 * Универсален — может работать с различными структурами входных данных через адаптер.
 */
export class FinishGaps {
  /**
   * Основной метод для расчета гэпов.
   *
   * @param results Массив результатов, отсортированных по времени (от самого быстрого к медленному).
   * @param getters Объект функций-адаптеров для извлечения и установки нужных данных.
   */
  setGaps = <T>(results: T[], getters: TFinishGapsGetters<T>) => {
    // Множество категорий, по которым будем считать гэпы.
    const categoriesInResults = new Set<TRaceSeriesCategories | 'absolute'>(['absolute']);

    // Сбор уникальных категорий из результатов
    for (const result of results) {
      const cat = getters.getCategory(result);
      if (cat) categoriesInResults.add(cat);
    }

    // Инициализация структуры для хранения индексов лидера и предыдущего райдера в каждой категории
    const indexesInCategories: Partial<
      Record<TRaceSeriesCategories | 'absolute', { leader: number | null; prev: number }>
    > = {};
    for (const key of categoriesInResults) {
      indexesInCategories[key] = { leader: null, prev: 0 };
    }

    // Основной цикл — проходимся по каждому результату
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const category = getters.getCategory(result);

      // Структура, в которую будут записаны рассчитанные гэпы/
      const gaps: TGapsInCategories = { category: null, absolute: null };

      // 👉 1. Расчёт гэпа в категории
      if (category) {
        const entry = indexesInCategories[category];
        if (entry) {
          if (entry.leader === null) {
            // Первый в категории — устанавливаем как лидера и предыдущего
            entry.leader = i;
            entry.prev = i;
          } else {
            // Расчёт гэпа к лидеру и предыдущему
            gaps.category = this.calculateGaps(results, i, entry.leader, entry.prev, getters);
            entry.prev = i; // Обновляем предыдущего
          }
        }
      }

      // 👉 2. Расчёт абсолютного гэпа
      const absolute = indexesInCategories['absolute'];
      if (absolute) {
        if (i === 0) {
          absolute.leader = 0; // Первый участник — абсолютный лидер
        } else {
          // Расчёт гэпа к абсолютному лидеру и предыдущему
          gaps.absolute = this.calculateGaps(results, i, 0, i - 1, getters);
        }
      }

      // 👉 3. Устанавливаем рассчитанные гэпы обратно в результат
      getters.setGaps(result, gaps);
    }
  };

  /**
   * Метод расчёта гэпа к лидеру и предыдущему райдеру.
   *
   * @param results Массив всех результатов.
   * @param index Индекс текущего участника.
   * @param leaderIndex Индекс лидера (первого участника в зачёте).
   * @param prevIndex Индекс предыдущего участника в зачёте.
   * @param getters Функции-адаптеры для извлечения продолжительности.
   * @returns Объект с гэпами: к лидеру и к предыдущему.
   */
  calculateGaps = <T>(
    results: T[],
    index: number,
    leaderIndex: number,
    prevIndex: number,
    getters: TFinishGapsGetters<T>
  ): { toLeader: number; toPrev: number } => {
    const toLeader =
      getters.getDuration(results[index]) - getters.getDuration(results[leaderIndex]);
    const toPrev =
      getters.getDuration(results[index]) - getters.getDuration(results[prevIndex]);

    return { toLeader, toPrev };
  };
}
