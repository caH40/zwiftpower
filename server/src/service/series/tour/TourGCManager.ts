import { categoriesForRankings as rankings } from '../../../assets/category.js';
import { NSeriesModel } from '../../../Model/NSeries.js';
import { SeriesClassificationModel } from '../../../Model/SeriesClassification.js';
import { StageResultModel } from '../../../Model/StageResult.js';
import { TResponseService } from '../../../types/http.interface.js';

// types
import { TDisqualification, TSeries, TSeriesStage } from '../../../types/model.interface.js';
import { TStagesResultsForGC } from '../../../types/mongodb-response.types.js';
import {
  TAllStageOrders,
  TCategorySeries,
  TGCForSave,
} from '../../../types/types.interface.js';
import { FinishGaps } from '../../../utils/FinishGaps.js';

// Тип: отображение riderId → список его результатов
type TRidersResults = Map<number, { results: TStagesResultsForGC[] }>;

/**
 * Класс управления/создания генеральной классификации тура.
 */
export class TourGCManager {
  constructor(public seriesId: string) {}
  /**
   * Пересчет всех итоговых таблиц.
   */
  public update = async (): Promise<TResponseService<null>> => {
    const seriesDB = await NSeriesModel.findOne(
      { _id: this.seriesId },
      { _id: false, name: true, stages: true }
    ).lean<Pick<TSeries, 'name' | 'stages'>>();

    if (!seriesDB) {
      throw new Error(`Серия с ID ${this.seriesId} не найдена.`);
    }

    // Список обязательных этапов для расчета генеральной классификации, отфильтрованный от дублей.
    const stageOrders = this.getStageOrders(seriesDB.stages);

    // Группировка результатов по райдерам.
    const riderResults = await this.createRidersResults();

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
    await SeriesClassificationModel.deleteMany({ seriesId: this.seriesId });

    // Сохранение в БД.
    await SeriesClassificationModel.create(gc);

    return {
      data: null,
      message: `Обновлена (создана) генеральная классификация серии заездов "${seriesDB.name}"`,
    };
  };

  /**
   * Приватный метод для группировки результатов по райдерам.
   * Возвращает Map, где ключ — profileId райдера, а значение — массив его результатов.
   */
  private createRidersResults = async (): Promise<TRidersResults> => {
    // Все результаты текущей серии заездов.
    const allStagesResults = await StageResultModel.find(
      { series: this.seriesId },
      {
        order: true,
        profileId: true,
        profileData: true,
        activityData: true,
        category: true,
        rank: true,
        points: true,
        disqualification: true,
        teamSquadAtRace: true,
      }
    ).lean<TStagesResultsForGC[]>();

    // Группируем все результаты этапов по riderId (profileId).
    const riderResultsInMap = allStagesResults.reduce<TRidersResults>((acc, cur) => {
      // Получаем текущие результаты райдера, если они есть.
      const existing = acc.get(cur.profileId);

      // Создаём новый массив результатов:
      // если уже есть результаты — добавляем текущий к копии.
      // если нет — создаём массив с одним элементом.
      const updatedResults = existing ? [...existing.results, cur] : [cur];

      // Обновляем Map: либо перезаписываем с новым массивом, либо добавляем новую запись.
      acc.set(cur.profileId, { results: updatedResults });

      return acc;
    }, new Map());

    return riderResultsInMap;
  };

  /**
   * Создаёт генеральную классификацию серии заездов.
   */
  private createGC = (
    ridersResults: TRidersResults,
    stageOrders: TAllStageOrders
  ): TGCForSave[] => {
    // Преобразуем Map в массив и обрабатываем каждого райдера.
    const gc = [...ridersResults].map(([profileId, { results }]) => {
      let totalFinishPoints = 0;
      let totalTimeInMilliseconds = 0;
      let stagesCompleted = 0;
      const disqualification: TDisqualification = { status: false };

      // Коллекция обязательных этапов, которые нужно пройти.
      const skippedStages = new Set(stageOrders.requiredStageOrders);

      for (const result of results) {
        // Суммируем очки за финиш.
        totalFinishPoints += result.points?.finishPoints || 0;

        // Суммируем общее время.
        totalTimeInMilliseconds += result.activityData.durationInMilliseconds || 0;

        // Учитываем только завершённые этапы.
        if (!result.disqualification?.status) {
          stagesCompleted++;
        }

        // Удаляем этап из обязательных, если он был пройден.
        skippedStages.delete(result.order);
      }

      // Список этапов, в которых участвовал райдер.
      // const stages = results.map((stage) => ({
      //   category: stage.category,
      //   profileData: stage.profileData,
      //   stageOrder: stage.order,
      //   durationInMilliseconds: stage.activityData.durationInMilliseconds,
      //   finishPoints: stage.points?.finishPoints || 0,
      // }));

      const stages = stageOrders.allStageOrders.map((stageOrder) => {
        const stage = results.find((s) => s.order === stageOrder);

        if (stage) {
          return {
            category: stage.category,
            profileData: stage.profileData,
            stageOrder: stage.order,
            durationInMilliseconds: stage.activityData.durationInMilliseconds,
            finishPoints: stage.points?.finishPoints || 0,
          };
        } else {
          // Создание пустых элементов в массиве этапов вместо тех, которые райдер не проехал или не финишировал (был дисквалифицирован).
          return {
            category: null,
            profileData: null,
            stageOrder: stageOrder,
            durationInMilliseconds: 0,
            finishPoints: 0,
          };
        }
      });

      // Если остались обязательные этапы, в которых не участвовали — дисквалификация.
      if (skippedStages.size > 0) {
        const sortedSkipped = [...skippedStages].sort((a, b) => a - b);
        disqualification.status = true;
        disqualification.reason = `Не завершены обязательные этапы: ${sortedSkipped.join(
          ', '
        )}.`;
      }

      // Определение категории. Категория во всех этапах должна быть одинаковой.
      // Если нет — это ошибка в расчётах, и райдеру присваивается дисквалификация для дальнейшего разбирательства.
      let finalCategory = this.getCommonCategory(stages);

      // Если категории не совпадают, но дисквалификация ещё не выставлена — ставим её с соответствующей причиной.
      if (!finalCategory && !disqualification.status) {
        disqualification.status = true;
        disqualification.reason = 'На этапах разные категории.';
      } else if (disqualification.status) {
        // Если уже была дисквалификация по другой причине — не назначаем финальную категорию.
        finalCategory = null;
      }

      return {
        seriesId: this.seriesId,
        rank: null,
        profileId,
        finalCategory,
        totalFinishPoints,
        totalTimeInMilliseconds,
        stagesCompleted,
        disqualification,
        teamSquadAtRace: null,
        gapsInCategories: {
          category: null,
          absolute: null,
        },
        stages,
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
      // Если по какой то причине не определена категория райдера не дисквалифицирован, показал результат, но нет категории.
      if (!result.finalCategory) {
        result.rank = null;

        const reason = result.disqualification?.status
          ? result.disqualification?.reason
          : 'Не определена категория в Серии!';
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
   * Определяет, одинаковая ли категория у всех этапов в массиве stages.
   * Если все этапы пройдены в одной категории — возвращает эту категорию.
   * Если категории различаются или массив пуст — возвращает null.
   */
  private getCommonCategory = (
    stages: {
      category: TCategorySeries | null;
      stageOrder: number;
      durationInMilliseconds: number;
      finishPoints: number;
    }[]
  ): TCategorySeries | null => {
    // Если этапов нет, возвращаем null.
    if (stages.length === 0) return null;

    // Сохраняем категорию первого завершенного этапа как базовую для сравнения.
    const firstCategory = stages.find((stage) => stage.durationInMilliseconds !== 0)?.category;

    // Нет ни одного результата на этапе Серии. FIXME: заранее фильтровать от райдеров, которые не проехали ни одного этапа. Для корректного отображения информации о дисквалификации. Проверка на firstCategory === null временная.
    if (!firstCategory) {
      return null;
    }

    // Проверяем, что все этапы имеют ту же категорию.
    const allSame = stages.every(
      (stage) => stage.category === firstCategory || stage.category === null
    );

    // Если все категории совпадают — возвращаем её, иначе null.
    return allSame ? firstCategory : null;
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
