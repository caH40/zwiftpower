import { SeriesRepository } from '../../../repositories/Series.js';
import { SeriesClassificationRepository } from '../../../repositories/SeriesClassification.js';
import { getOrThrow } from '../../../utils/getOrThrow.js';
import { AbstractBaseGCManager } from '../AbstractBaseGC.js';
import { createRidersResults, createStagesForRider } from '../utils.js';
import { categoriesForRankings as rankings } from '../../../assets/category.js';

// types
import { TRidersResults, TSimpleStage } from '../../../types/series.types.js';
import { TDisqualification } from '../../../types/model.interface.js';
import { TGCForSave, TRaceSeriesCategories } from '../../../types/types.interface.js';

/**
 * Класс работы с генеральной классификацией серии типа Endurance.
 */
export class EnduranceGC extends AbstractBaseGCManager {
  private seriesRepository: SeriesRepository = new SeriesRepository();
  private gcRepository: SeriesClassificationRepository = new SeriesClassificationRepository();

  constructor(public seriesId: string) {
    super(seriesId);
  }

  /**
   * Пересчет всех итоговых таблиц.
   */
  update = async () => {
    const seriesDB = await getOrThrow(
      this.seriesRepository.getStageIds(this.seriesId),
      `Серия с ID ${this.seriesId} не найдена.`
    );

    // Группировка результатов по райдерам.
    const riderResults = await createRidersResults(this.seriesId);

    // Номера этапов в серии.
    const allStageOrders = seriesDB.stages.map((stage) => stage.order).sort((a, b) => a - b);

    // Создание генеральной классификации серии заездов.
    const gc = await this.createGC(riderResults, allStageOrders);

    // Удаление предыдущих данных по этой серии.
    await this.gcRepository.deleteMany(this.seriesId);

    // Сохранение в БД.
    await this.gcRepository.create(gc);

    // Изменение даты когда обновлялись результаты серии.
    await this.seriesRepository.getById(this.seriesId);

    return {
      data: null,
      message: `Обновлена (создана) генеральная классификация серии заездов "${seriesDB.name}"`,
    };
  };

  private createGC = async (
    ridersResults: TRidersResults,
    allStageOrders: number[]
  ): Promise<TGCForSave[]> => {
    // Преобразуем Map в массив и обрабатываем каждого райдера.
    const gc = [...ridersResults].map(([profileId, { results }]) => {
      // Инициализация счетчиков.
      const counters = {
        totalFinishPoints: 0,
        totalTimeInMilliseconds: 0,
        totalElevationInMeters: 0,
        totalDistanceInMeters: 0,
        totalCalories: 0,
        stagesCompleted: 0,
      };
      const disqualification: TDisqualification = { status: false };

      // Суммируем показатели за пройденные этапы.
      for (const result of results) {
        counters.totalFinishPoints += result.points?.finishPoints || 0;
        counters.totalTimeInMilliseconds += result.activityData.durationInMilliseconds || 0;
        counters.totalDistanceInMeters += result.activityData.segmentDistanceInMeters || 0;
        counters.totalElevationInMeters += result.activityData.elevationInMeters || 0;
        counters.totalCalories += result.activityData.calories || 0;
        counters.stagesCompleted++;
      }

      // Создание списка этапов из серии заездов в которых участвовал райдер.
      const riderParticipationStages = createStagesForRider({
        allStageOrders,
        results,
      });

      const finalCategory = this.getFinalCategory(riderParticipationStages);

      return {
        seriesId: this.seriesId,
        rank: null,
        profileId,
        finalCategory,
        totalFinishPoints: counters.totalFinishPoints,
        totalTimeInMilliseconds: counters.totalTimeInMilliseconds,
        stagesCompleted: counters.stagesCompleted,
        totalDistanceInMeters: counters.totalDistanceInMeters,
        disqualification,
        totalElevationInMeters: counters.totalElevationInMeters,
        totalCalories: counters.totalCalories,
        teamSquadAtRace: null,
        gapsInCategories: {
          category: null,
          absolute: null,
        },
        stages: riderParticipationStages,
      };
    });

    // Присвоение ранкинга для каждого участника;
    return this.setCategoryRanks(gc);
  };

  private getFinalCategory = (
    stages: TSimpleStage[]
    // lastStageOrder: number
  ): TRaceSeriesCategories | null => {
    // Если этапов нет, возвращаем null.
    if (stages.length === 0) {
      return null;
    }

    // Категория берется из последнего завершенного этапа для райдера.
    const sortedStages = stages.toSorted((a, b) => b.stageOrder - a.stageOrder);

    for (const stage of sortedStages) {
      if (stage.category !== null) {
        return stage.category;
      }
    }

    return null;
  };

  /**
   * Сортировка результатов и установка ранкинга в результатах для каждой категории.
   */
  private setCategoryRanks(results: TGCForSave[]): TGCForSave[] {
    if (!results.length) {
      return [];
    }

    const resultsSorted = results.toSorted(
      (a, b) => b.totalDistanceInMeters - b.totalDistanceInMeters
    );

    const categoriesForRankings = { ...rankings };

    return resultsSorted.map((result) => {
      // Если по какой то причине не определена категория райдера, то есть показал результат, не дисквалифицирован, но нет категории.
      if (!result.finalCategory) {
        result.rank = null;

        let reason: undefined | string = undefined;

        if (!result.disqualification?.status) {
          reason = 'Не определена категория в Серии!';
        }

        result.disqualification = { status: true, reason };
        return result;
      }

      // Присвоение финишного места в категории и увеличение соответствующего счетчика.
      result.rank = { category: categoriesForRankings[result.finalCategory] ?? 0, absolute: 0 };
      categoriesForRankings[result.finalCategory]++;

      // Присвоение финишного места в абсолюте и увеличение соответствующего счетчика.
      result.rank.absolute = categoriesForRankings['absolute'] ?? 0;
      categoriesForRankings['absolute']++;
      return result;
    });
  }
}
