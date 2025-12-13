// types
import { massCoefficients } from '../../assets/racePoints.js';
import { TStageResult, ZwiftResultSchema } from '../../types/model.interface.js';
import { TRaceSeriesCategories } from '../../types/types.interface.js';

export class PointsCalculator {
  private coefficientCache: Map<number, number>;

  constructor() {
    this.coefficientCache = new Map<number, number>(); // Инициализация кеша.
  }

  /**
   * Расчет количества райдеров в категориях для определения массового коэффициента для этапов с группами.
   * @param stageResults - Массив результатов этапа.
   * @returns Объект с количеством участников по каждой категории.
   */
  calculateRidersInStageCategories = (
    stageResults: TStageResult[]
  ): Record<TRaceSeriesCategories, number> => {
    const counters = {} as Record<TRaceSeriesCategories, number>;

    stageResults.forEach((result) => {
      const { category } = result;
      if (category) {
        counters[category] = counters[category] ? counters[category] + 1 : 1;
      }
    });

    return counters;
  };

  /**
   * Расчет количества райдеров в категориях для определения массового коэффициента.
   * @param stageResults - Массив результатов этапа.
   * @returns Объект с количеством участников по каждой категории.
   */
  calculateRidersInCategories = (
    results: ZwiftResultSchema[]
  ): Record<TRaceSeriesCategories, number> => {
    const counters = {} as Record<TRaceSeriesCategories, number>;

    results.forEach((result) => {
      const subgroupLabel = result.subgroupLabel as TRaceSeriesCategories;

      if (subgroupLabel) {
        counters[subgroupLabel] = counters[subgroupLabel] ? counters[subgroupLabel] + 1 : 1;
      }
    });

    return counters;
  };

  /**
   * Расчет итоговых финишных очков по формуле ZPRU
   * @param baseRacePoints - Базовые очки за место
   * @param massCoefficient - Коэффициент массовости (количество участников)
   * @param importanceCoefficient - Коэффициент важности мероприятия
   * @returns Рассчитанные финишные очки (округленные до целого)
   */
  calculateZpruFinishPoints = ({
    baseRacePoints,
    massCoefficient,
    importanceCoefficient,
  }: {
    baseRacePoints: number;
    massCoefficient: number;
    importanceCoefficient: number;
  }): number => {
    return Math.round(baseRacePoints * massCoefficient * importanceCoefficient);
  };

  /**
   * Получение массового коэффициента на основе количества участников
   * Использует кеширование для оптимизации повторных расчетов
   * @param participantCount - Количество участников в категории
   * @returns Массовый коэффициент (от 0 до 1)
   */
  public getMassCoefficient(participantCount: number): number {
    // Валидация входного параметра.
    if (!Number.isInteger(participantCount) || participantCount < 0) {
      return 0;
    }

    // Пытаемся получить коэффициент из кеша.
    let coefficient = this.coefficientCache.get(participantCount);

    // Если коэффициент найден в кеше, возвращаем его.
    if (coefficient !== undefined) {
      return coefficient;
    }

    // Ищем подходящий коэффициент в массиве massCoefficients.
    coefficient =
      massCoefficients.find(
        (elm) =>
          participantCount >= elm.participants.min &&
          (elm.participants.max === null || participantCount <= elm.participants.max)
      )?.coefficient ?? 0; // Значение по умолчанию 0 если не найден.

    // Сохраняем в кеш для будущих обращений.
    this.coefficientCache.set(participantCount, coefficient);

    return coefficient;
  }

  /**
   * Очистка кеша коэффициентов (полезно при обновлении данных)
   */
  public clearCache(): void {
    this.coefficientCache.clear();
  }
}
