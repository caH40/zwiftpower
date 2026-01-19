import { HandlerSeries } from './HandlerSeries.js';
import { addAgeAndFlagNew } from '../protocol/age-and-flag.js';
import { FinishGaps } from '../../utils/FinishGaps.js';
import { StageResultModel } from '../../Model/StageResult.js';
import { NSeriesModel } from '../../Model/NSeries.js';
import { SeriesCategoryService } from './category/SeriesCategory.js';
import { StageResultRepository } from '../../repositories/StageResult.js';
import { GCProviderFactory } from './GCProviderFactory.js';
import { StageRanker } from './stageRanker/StageRanker.js';
import { countFinishersForStageResults } from '../../utils/countFinishers.js';
import { StageRacePointsService } from './points/StageRacePointsService.js';
import { FinishTimeClassification } from './FinishTimeClassification.js';

// types
import { TSeriesType, TStageResult } from '../../types/model.interface.js';
import { TResponseService } from '../../types/http.interface.js';
import { FinalFinishTimeOnStage } from './FinalFinishTimeOnStage.js';

/**
 * Класс создания (обновления) протоколов серий и туров.
 * -добавление недостающих данных;
 * -перерасчет всех протоколов серии(тура) в зависимости от соответствующих настроек;
 */
export class SeriesStageProtocolManager extends HandlerSeries {
  stageResultRepository = new StageResultRepository();
  stageRanker = new StageRanker();
  finishTimeClassification: FinishTimeClassification;

  constructor(public seriesId: string) {
    super(seriesId);
    this.finishTimeClassification = new FinishTimeClassification(seriesId);
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
   * Этапы:
   * 1. Создается массив заездов (eventId) для запрашиваемого этапа stageOrder (На этапе может быть
   * несколько заездов);
   * 2. Из zwiftAPI запрашиваются протоколы для соответствующих заездов;
   * 3. В каждый результат добавляются отсутствующие данные: флаг страны и возраст участника
   * из регистрационных данных соответствующего райдера;
   * 4. Установка категорий райдерам согласно правилам серии;
   * 5. В каждый результат добавляются дополнительные данные: количество финишировавших
   * в категории райдера и в абсолюте на соответствующем этапе.
   * 6. Установка финального финишного времени с учетом правил: "общее время для финишной группы
   * в разрешенном временном интервале";
   * 7. Установка ранкинга участникам в финишном протоколе в группе и абсолюте;
   * 8. Установка классификационного финишного времени с учетом правила "общее время для одной финишной группы";
   * 9. Расчет и установка финального финишного времени finalDurationInMilliseconds
   *
   * @param {number} stageOrder - Номер этапа (order) в серии заездов.
   */
  public async buildStageProtocol(stageOrder: number): Promise<{ seriesType: TSeriesType }> {
    const { stages: stagesFromSeries, type, importanceLevel } = await this.getSeriesData();

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

    countFinishersForStageResults(resultsWithCategories);

    // Сортировка результатов и проставления ранкинга в каждой категории.
    const resultsWithRank = await this.stageRanker.calculateRanking(
      resultsWithCategories,
      type
    );

    // Добавление классификационного времени с учетом правила общее время на финише в определенном временном разрыве.
    const resultsWithTimeClassification =
      await this.finishTimeClassification.set(resultsWithRank);

    const resultsWithFinalTime = FinalFinishTimeOnStage.set(resultsWithTimeClassification);

    // Установка финишных гэпов (разрывов между участниками).
    const finishGaps = new FinishGaps();
    finishGaps.setGaps(resultsWithFinalTime, {
      getDuration: (r) => r.finalDurationInMilliseconds,
      getCategory: (r) => r.category,
      setGaps: (r, gaps) => {
        r.gapsInCategories = gaps;
      },
    });

    // Добавление очков за этап серии заездов.
    const stageRacePointsService = new StageRacePointsService();
    const resultsWithPoints = stageRacePointsService.calculateAndSetRacePoints({
      results: resultsWithFinalTime,
      importanceLevel,
    });

    // Удаление всех старых результатов текущего этапа серии.
    await this.deleteOutdatedStageResults(stageOrder);

    // Сохранение результатов в БД.
    await StageResultModel.create(resultsWithPoints);

    // Изменение  hasResults и resultsUpdatedAt даты обновления результатов в данных этапа серии.
    await NSeriesModel.findOneAndUpdate(
      { _id: this.seriesId, 'stages.order': stageOrder },
      {
        $set: {
          'stages.$.resultsUpdatedAt': new Date(),
          'stages.$.hasResults': resultsWithPoints.length > 0,
        },
      }
    );

    return { seriesType: type };
  }

  /**
   * Пересчёт протоколов этапов серии после изменения категории, внесении штрафа,
   * дисквалификации участнику(ам).
   */
  public async recalculateStageProtocol(seriesId: string): Promise<void> {
    const { type, importanceLevel } = await this.getSeriesData();

    // Получение всех результатов этапов серии seriesId.
    const allStageResults =
      await this.stageResultRepository.getAllStageResultsBySeriesId(seriesId);

    // Группировка результатов по этапам.
    const resultsByStageOrderMap: Map<number, TStageResult[]> = new Map();

    for (const result of allStageResults) {
      const resultsInMap = resultsByStageOrderMap.get(result.order) || [];
      resultsInMap.push(result);
      resultsByStageOrderMap.set(result.order, resultsInMap);
    }

    // Пересчёт протоколов этапов серии.
    for (const [order, resultsInStage] of resultsByStageOrderMap.entries()) {
      // Сортировка результатов и проставления ранкинга в каждой категории для этапа.
      const resultsWithRank = await this.stageRanker.calculateRanking(resultsInStage, type);

      // Добавление классификационного времени с учетом правила общее время на финише в определенном временном разрыве.
      const resultsWithTimeClassification =
        await this.finishTimeClassification.set(resultsWithRank);

      const resultsWithFinalTime = FinalFinishTimeOnStage.set(resultsWithTimeClassification);

      // Установка финишных гэпов (разрывов между участниками).
      const finishGaps = new FinishGaps();
      finishGaps.setGaps(resultsWithFinalTime, {
        getDuration: (r) => r.finalDurationInMilliseconds,
        getCategory: (r) => r.category,
        setGaps: (r, gaps) => {
          r.gapsInCategories = gaps;
        },
      });

      // Добавление очков за этап серии заездов.
      const stageRacePointsService = new StageRacePointsService();
      const resultsWithPoints = stageRacePointsService.calculateAndSetRacePoints({
        results: resultsWithFinalTime,
        importanceLevel,
      });

      // Удаление старых результатов этапа серии.
      await StageResultModel.deleteMany({ series: seriesId, order });

      // Сохранение обновленных результатов этапа серии.
      await StageResultModel.insertMany(resultsWithPoints);
    }
  }
}
