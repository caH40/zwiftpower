import { HandlerSeries } from './HandlerSeries.js';
import { addAgeAndFlagNew } from '../protocol/age-and-flag.js';
import { FinishGaps } from '../../utils/FinishGaps.js';
import { StageResultModel } from '../../Model/StageResult.js';
import { NSeriesModel } from '../../Model/NSeries.js';
import { TSeriesType } from '../../types/model.interface.js';
import { TourGCManager } from './tour/TourGCManager.js';
import { TResponseService } from '../../types/http.interface.js';

// types

/**
 * Класс создания (обновления) протоколов серий и туров.
 * -добавление недостающих данных;
 * -перерасчет всех протоколов серии(тура) в зависимости от соответствующих настроек;
 */
export class SeriesStageProtocolManager extends HandlerSeries {
  constructor(public seriesId: string) {
    super(seriesId);
  }

  async updateStageProtocolAndGC(stageOrder: number): Promise<TResponseService<null>> {
    // Удаление старого и создание нового финишного протокола этапа stageOrder серии seriesId.
    const { seriesType } = await this.buildStageProtocol(stageOrder);

    const initialResponse = {
      data: null,
      message: `📝 Тип '${seriesType}' будет реализован в ближайшем обновлении`,
    };

    switch (seriesType) {
      case 'series':
        return initialResponse;

      case 'tour': {
        // Обновление генеральной классификации серии.
        const tourGC = new TourGCManager(this.seriesId);
        const res = await tourGC.update();

        return {
          data: null,
          message: `Созданы результаты этапа №${stageOrder}. ${res.message}`,
        };
      }

      case 'catchUp':
        return initialResponse;

      case 'criterium':
        return initialResponse;

      default:
        throw new Error(`❌ Неподдерживаемый тип серии: ${seriesType}`);
    }
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

    return { seriesType: type };
  }

  /**
   * Пересчёт протокола этапа после правок результатов модератором.
   */
  public async recalculateStageProtocol(): Promise<void> {}
}
