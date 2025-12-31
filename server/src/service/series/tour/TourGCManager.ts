import { categoriesForRankings as rankings } from '../../../assets/category.js';
import { FinishGaps } from '../../../utils/FinishGaps.js';
import { SeriesRepository } from '../../../repositories/Series.js';
import { AbstractBaseGCManager } from '../AbstractBaseGC.js';
import { createRidersResults, createStagesForRider } from '../utils.js';
import { getOrThrow } from '../../../utils/getOrThrow.js';
import { SeriesClassificationRepository } from '../../../repositories/SeriesClassification.js';

// types
import { TDisqualification, TSeriesStage } from '../../../types/model.interface.js';
import {
  TAllStageOrders,
  TRaceSeriesCategories,
  TGCForSave,
} from '../../../types/types.interface.js';
import { TResponseService } from '../../../types/http.interface.js';
import { TGCRiderStage, TRidersResults } from '../../../types/series.types.js';

/**
 * Класс управления/создания генеральной классификации тура.
 */
export class TourGCManager extends AbstractBaseGCManager {
  private seriesRepository: SeriesRepository;
  private gcRepository: SeriesClassificationRepository = new SeriesClassificationRepository();

  constructor(public seriesId: string) {
    super(seriesId);
    this.seriesRepository = new SeriesRepository();
  }

  /**
   * Пересчет всех итоговых таблиц.
   */
  public update = async (): Promise<TResponseService<null>> => {
    const seriesDB = await getOrThrow(
      this.seriesRepository.getStageIds(this.seriesId),
      `Серия с ID ${this.seriesId} не найдена.`
    );

    // Список обязательных этапов для расчета генеральной классификации, отфильтрованный от дублей.
    const stageOrders = this.getStageOrders(seriesDB.stages);

    // Группировка результатов по райдерам.
    const riderResults = await createRidersResults(this.seriesId);

    // Создание генеральной классификации серии заездов.
    const gc = this.createGC(riderResults, stageOrders);

    // Установка финишных гэпов (разрывов между участниками).
    const finishGaps = new FinishGaps();
    finishGaps.setGaps(gc, {
      getDuration: (r) => r.totalTimeInMilliseconds,
      getCategory: (r) => r.finalCategory,
      setGaps: (r, gaps) => {
        r.gapsInCategories = gaps;
      },
    });

    // Удаление предыдущих данных по этой серии.
    await this.gcRepository.deleteMany(this.seriesId);

    // Сохранение в БД.
    await this.gcRepository.create(gc);

    // Изменение даты когда обновлялись результаты серии.
    await this.seriesRepository.updateResultModificationDate(this.seriesId);

    return {
      data: null,
      message: `Обновлена (создана) генеральная классификация серии заездов "${seriesDB.name}"`,
    };
  };

  /**
   * Создаёт генеральную классификацию серии заездов.
   * 1. Инициализация счетчиков.
   */
  private createGC = (
    ridersResults: TRidersResults,
    stageOrders: TAllStageOrders
  ): TGCForSave[] => {
    // Преобразуем Map в массив и обрабатываем каждого райдера.
    const gc = [...ridersResults].map(([profileId, { results }]) => {
      // 1. Инициализация счетчиков.
      let totalFinishPoints = 0;
      let totalTimeInMilliseconds = 0;
      let totalElevationInMeters = 0;
      let totalDistanceInMeters = 0;
      let totalCalories = 0;
      let stagesCompleted = 0;
      const disqualification: TDisqualification = { status: false };

      // Коллекция обязательных этапов, в которых необходимо финишировать.
      const requiredStages = new Set(stageOrders.requiredStageOrders);

      // Расчет данных totalFinishPoints, totalTimeInMilliseconds и определение пропущенных этапов: requiredStages .
      for (const result of results) {
        // Суммируем очки за финиш.
        totalFinishPoints += result.points?.finishPoints || 0;

        // Суммируем общее время.
        totalTimeInMilliseconds += result.activityData.durationInMilliseconds || 0;
        totalDistanceInMeters += result.activityData.segmentDistanceInMeters || 0;
        totalElevationInMeters += result.activityData.elevationInMeters || 0;
        totalCalories += result.activityData.calories || 0;

        // Учитываем только завершённые этапы.
        if (!result.disqualification?.status) {
          stagesCompleted++;
        }

        // Удаляем этап из обязательных, если он был пройден.
        requiredStages.delete(result.order);
      }

      // Создание списка этапов из серии заездов в которых участвовал райдер.
      const riderParticipationStages = createStagesForRider({
        allStageOrders: stageOrders.allStageOrders,
        results,
      });

      // Если остались обязательные этапы, в которых не участвовали — дисквалификация.
      if (requiredStages.size > 0) {
        const sortedSkipped = [...requiredStages].sort((a, b) => a - b);
        disqualification.status = true;
        disqualification.reason = `Не завершены обязательные этапы: ${sortedSkipped.join(
          ', '
        )}.`;
        disqualification.label = 'MRS';
      }

      // const lastStageOrder = stageOrders.requiredStageOrders.sort((a, b) => b - a)[0];

      // Если нет — это ошибка в расчётах, и райдеру присваивается дисквалификация для дальнейшего разбирательства.
      const finalCategory = this.getFinalCategory(riderParticipationStages);

      // Если уже была дисквалификация по другой причине — не назначаем финальную категорию.
      // if (disqualification.status) {
      //   finalCategory = null;
      // }

      return {
        seriesId: this.seriesId,
        rank: null,
        profileId,
        finalCategory,
        totalFinishPoints,
        totalTimeInMilliseconds,
        stagesCompleted,
        totalDistanceInMeters,
        disqualification,
        totalElevationInMeters,
        totalCalories,
        teamSquadAtRace: null,
        gapsInCategories: {
          category: null,
          absolute: null,
        },
        stages: riderParticipationStages,
      };
    });

    // Разделение результатов на не дисквалифицированные и дисквалифицированные.
    const { validResults, dsqResults } = gc.reduce(
      (acc, cur) => {
        if (cur.disqualification.status) {
          acc.dsqResults.push(cur);
        } else {
          acc.validResults.push(cur);
        }

        return acc;
      },
      { validResults: [] as TGCForSave[], dsqResults: [] as TGCForSave[] }
    );

    // Присвоение ранкинга для каждого участника;
    const resultsWithRanks = this.setCategoryRanks(validResults);

    return [...resultsWithRanks, ...dsqResults];
  };

  /**
   * Сортировка результатов и установка ранкинга в результатах для каждой категории.
   */
  private setCategoryRanks(results: TGCForSave[]): TGCForSave[] {
    if (!results.length) {
      return [];
    }

    const resultsSorted = results.toSorted(
      (a, b) => a.totalTimeInMilliseconds - b.totalTimeInMilliseconds
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

  /**
   * Происходит перебор завершенных этапов с конца и первая категория не null будет
   * категорией в Главном зачете.
   */
  private getFinalCategory = (
    stages: TGCRiderStage[]
    // lastStageOrder: number
  ): TRaceSeriesCategories | null => {
    // Если этапов нет, возвращаем null.
    if (stages.length === 0) {
      return null;
    }

    // Категория берется из последнего завершенного и обязательного этапа для райдера.
    // const lastStage = stages.find(({ stageOrder }) => stageOrder === lastStageOrder);

    const sortedStages = stages.toSorted((a, b) => b.stageOrder - a.stageOrder);

    for (const stage of sortedStages) {
      if (stage.category !== null) {
        return stage.category;
      }
    }

    // Нет ни одного результата на этапе Серии. FIXME: заранее фильтровать от райдеров, которые не проехали ни одного этапа. Для корректного отображения информации о дисквалификации. Проверка на firstCategory === null временная.
    return null;
  };

  /**
   * Получение всех и обязательных для ГК номеров этапов.
   */
  private getStageOrders = (stages: TSeriesStage[]): TAllStageOrders => {
    // Список всех и обязательных этапов для расчета генеральной классификации, отфильтрованный от дублей.
    const { requiredStageOrders, allStageOrders } = stages.reduce<TAllStageOrders>(
      (acc, cur) => {
        if (
          cur.includeResults &&
          !acc.requiredStageOrders.includes(cur.order) &&
          cur.hasResults
        ) {
          acc.requiredStageOrders.push(cur.order);
        }

        if (!acc.allStageOrders.includes(cur.order)) {
          acc.allStageOrders.push(cur.order);
        }

        return acc;
      },
      { requiredStageOrders: [], allStageOrders: [] }
    );

    allStageOrders.sort((a, b) => a - b);

    return { requiredStageOrders, allStageOrders };
  };
}
