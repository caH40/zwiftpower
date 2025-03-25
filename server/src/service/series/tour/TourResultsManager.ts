import { HandlerSeries } from '../HandlerSeries.js';

/**
 * Класс работы с результатами Тура TSeriesType = 'tour'
 */
export class TourResultsManager extends HandlerSeries {
  constructor(public seriesId: string) {
    super(seriesId); // Вызов конструктора базового класса.
    // this.handlerSeries = new HandlerSeries(seriesId);
  }

  /**
   * Создание финишного протокола Этапа тура на основе данных протокола с ZwiftAPI.
   *
   * @param {number} stageOrder - Номер этапа (order) в серии заездов.
   */
  public async buildStageProtocol(stageOrder: number) {
    const { stages: stagesFromSeries } = await this.getSeriesData();

    // Создание массива заездов, если в этапе несколько заездов.
    const stages = stagesFromSeries
      .filter((stage) => stage.order === stageOrder)
      .map((stage) => stage.event);

    if (stages.length === 0) {
      throw new Error(`Этап с порядковым номером ${stageOrder} не найден в серии.`);
    }

    // Получение финишных протоколов заездов Этапа серии из ZwiftAPI.
    const protocolsStageFromZwift = await this.getProtocolsStageFromZwift({
      stages,
      stageOrder,
    });

    // Установка категорий райдерам.
    const resultsWithCategories = await this.setCategories({
      stageResults: protocolsStageFromZwift,
      stageOrder,
    });

    // Сортировка результатов и проставления ранкинга в каждой категории.
    const resultsWithRank = this.setCategoryRanks(resultsWithCategories);

    console.log(resultsWithRank[11]);
    return protocolsStageFromZwift;
  }
}
