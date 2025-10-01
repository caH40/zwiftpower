import { NSeriesModel } from '../../../Model/NSeries.js';
import { StageResultModel } from '../../../Model/StageResult.js';
import { TResponseService } from '../../../types/http.interface.js';
import { FinishGaps } from '../../../utils/FinishGaps.js';
import { addAgeAndFlagNew } from '../../protocol/age-and-flag.js';
import { HandlerSeries } from '../HandlerSeries.js';
import { TourGCManager } from './TourGCManager.js';

/**
 * Класс работы с результатами Тура TSeriesType = 'tour'
 */
export class TourResultsManager extends HandlerSeries {
  constructor(public seriesId: string) {
    super(seriesId); // Вызов конструктора базового класса.
  }

  /**
   * Создание финишного протокола Этапа тура на основе данных протокола с ZwiftAPI.
   *
   * @param {number} stageOrder - Номер этапа (order) в серии заездов.
   */
  public async buildStageProtocol(stageOrder: number): Promise<TResponseService<null>> {
    const { stages: stagesFromSeries } = await this.getSeriesData();

    // Создание массива заездов, если в этапе несколько заездов.
    const stages = stagesFromSeries
      .filter((stage) => stage.order === stageOrder)
      .map((stage) => stage.event);

    if (stages.length === 0) {
      throw new Error(`Этап с порядковым номером ${stageOrder} не найден в серии.`);
    }

    // Получение финишных протоколов заездов Этапа серии из ZwiftAPI.
    const { stageResults: protocolsStageFromZwift, subgroupIdsInEvents } =
      await this.getProtocolsStageFromZwift({
        stages,
        stageOrder,
      });

    // Добавление флага и возраста из регистрационных данных райдеров в результаты этапа соответствующих райдеров. (Эти данные отсутствуют в финишном протоколе ZwiftAPI).
    const resultsWithAgeAndFlag = await addAgeAndFlagNew(
      subgroupIdsInEvents,
      protocolsStageFromZwift
    );

    // Установка категорий райдерам.
    const resultsWithCategories = await this.setCategories({
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

    // Обновление генеральной классификации серии.
    const tourGC = new TourGCManager(this.seriesId);
    const res = await tourGC.update();

    return { data: null, message: `Созданы результаты этапа №${stageOrder}. ${res.message}` };
  }

  /**
   * Пересчёт протокола этапа после правок результатов модератором.
   */
  public async recalculateStageProtocol(): Promise<void> {}
}
