import { HandlerSeries } from './HandlerSeries.js';
import { addAgeAndFlagNew } from '../protocol/age-and-flag.js';
import { FinishGaps } from '../../utils/FinishGaps.js';
import { StageResultModel } from '../../Model/StageResult.js';
import { NSeriesModel } from '../../Model/NSeries.js';
import { SeriesCategoryService } from './category/SeriesCategory.js';
import { StageResultRepository } from '../../repositories/StageResult.js';
import { GCProviderFactory } from './GCProviderFactory.js';

// types
import { TSeriesType, TStageResult } from '../../types/model.interface.js';
import { TResponseService } from '../../types/http.interface.js';

/**
 * Класс создания (обновления) протоколов серий и туров.
 * -добавление недостающих данных;
 * -перерасчет всех протоколов серии(тура) в зависимости от соответствующих настроек;
 */
export class SeriesStageProtocolManager extends HandlerSeries {
  stageResultRepository: StageResultRepository;

  constructor(public seriesId: string) {
    super(seriesId);
    this.stageResultRepository = new StageResultRepository();
  }

  /**
   * Запуск создания(обновления) протокола этапа stageOrder с последующим пересчетом таблиц ГС.
   */
  async updateStageProtocolAndGC(stageOrder: number): Promise<TResponseService<null>> {
    // Удаление старого и создание нового финишного протокола этапа stageOrder серии seriesId.
    const { seriesType } = await this.buildStageProtocol(stageOrder);

    const gcProvider = new GCProviderFactory(this.seriesId);
    const gcHandler = gcProvider.getHandler(seriesType);

    return await gcHandler.update();
  }

  /**
   * Создание финишного протокола Этапа серии или тура на основе данных протокола с ZwiftAPI.
   * Добавление дополнительных данных в результаты райдеров.
   * Запрос приходит от организатора или автоматически по расписанию обновлений результатов этапов.
   *
   * @param {number} stageOrder - Номер этапа (order) в серии заездов.
   */
  public async buildStageProtocol(stageOrder: number): Promise<{ seriesType: TSeriesType }> {
    const { stages: stagesFromSeries, type } = await this.getSeriesData();

    // Создание массива заездов, если в этапе несколько заездов.
    const stages = stagesFromSeries
      .filter((stage) => stage.order === stageOrder)
      .map((stage) => stage.event);

    if (stages.length === 0) {
      throw new Error(`Этап с порядковым номером ${stageOrder} не найден в серии.`);
    }

    // Получение финишных протоколов заездов Этапа серии из ZwiftAPI.
    const { stageResults: protocolsStageFromZwift, subgroupIdsInEvents } =
      await this.createProtocolsStageFromZwift({
        stages,
        stageOrder,
      });

    // Добавление флага и возраста из регистрационных данных райдеров в результаты этапа соответствующих райдеров. (Эти данные отсутствуют в финишном протоколе ZwiftAPI).
    const resultsWithAgeAndFlag = await addAgeAndFlagNew(
      subgroupIdsInEvents,
      protocolsStageFromZwift
    );

    // Автоматическое определение и установка категорий райдерам в заезде.
    const categoryService = new SeriesCategoryService(this.seriesId);
    const resultsWithCategories = await categoryService.autoAssignRiderCategories({
      stageResults: resultsWithAgeAndFlag,
      stageOrder,
    });

    // Сортировка результатов и проставления ранкинга в каждой категории.
    const resultsWithRank = this.setCategoryRanks(resultsWithCategories);

    // Установка финишных гэпов (разрывов между участниками).
    const finishGaps = new FinishGaps();
    finishGaps.setGaps(resultsWithRank, {
      getDuration: (r) => r.activityData.durationInMilliseconds,
      getCategory: (r) => r.category,
      setGaps: (r, gaps) => {
        r.gapsInCategories = gaps;
      },
    });

    // Удаление всех старых результатов текущего этапа серии.
    await this.deleteOutdatedStageResults(stageOrder);

    // Сохранение результатов в БД.
    await StageResultModel.create(resultsWithRank);

    // Изменение  hasResults и resultsUpdatedAt даты обновления результатов в данных этапа серии.
    await NSeriesModel.findOneAndUpdate(
      { _id: this.seriesId, 'stages.order': stageOrder },
      {
        $set: {
          'stages.$.resultsUpdatedAt': new Date(),
          'stages.$.hasResults': resultsWithRank.length > 0,
        },
      }
    );

    return { seriesType: type };
  }

  /**
   * Пересчёт протокола этапа после правок результатов модератором.
   */
  public async recalculateStageProtocol(seriesId: string): Promise<void> {
    // Получение всех результатов этапов серии seriesId.
    const allStageResults = await this.stageResultRepository.getAllStageResultsBySeriesId(
      seriesId
    );
    // Группировка результатов по этапам.
    const resultsByStageOrderMap: Map<number, TStageResult[]> = new Map();
    for (const result of allStageResults) {
      const resultsInMap = resultsByStageOrderMap.get(result.order) || [];
      resultsInMap.push(result);
      resultsByStageOrderMap.set(result.order, resultsInMap);
    }
    for (const [order, resultsInStage] of resultsByStageOrderMap.entries()) {
      // Сортировка результатов и проставления ранкинга в каждой категории для этапа.
      const resultsWithRank = this.setCategoryRanks(resultsInStage);
      // Установка финишных гэпов (разрывов между участниками).
      const finishGaps = new FinishGaps();
      finishGaps.setGaps(resultsWithRank, {
        getDuration: (r) => r.activityData.durationInMilliseconds,
        getCategory: (r) => r.category,
        setGaps: (r, gaps) => {
          r.gapsInCategories = gaps;
        },
      });

      await StageResultModel.deleteMany({ series: seriesId, order });
      await StageResultModel.insertMany(resultsWithRank);
    }
  }
}
