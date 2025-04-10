import { stageResultsDto } from '../../../dto/series.js';
import { StageResultModel } from '../../../Model/StageResult.js';
import { StageResultDto } from '../../../types/dto.interface.js';
import { TResponseService } from '../../../types/http.interface.js';
import { TStageResult } from '../../../types/model.interface.js';
import { HandlerSeries } from '../HandlerSeries.js';

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

    // Удаление всех старых результатов текущего этапа серии.
    await this.deleteOutdatedStageResults(stageOrder);

    // Сохранение результатов в БД.
    await StageResultModel.create(resultsWithRank);

    // console.log(`Создано ${response.length} результатов этапа №${stageOrder}`);

    return { data: null, message: `Созданы результаты этапа №${stageOrder}` };
  }

  /**
   * Результаты этапа серии заездов.
   */
  public getStageResults = async (stageOrder: number): Promise<StageResultDto[]> => {
    const resultsDB = await StageResultModel.find({
      series: this.seriesId,
      order: stageOrder,
    }).lean<TStageResult[]>();

    const resultsAfterDto = resultsDB.map((result) => stageResultsDto(result));

    return resultsAfterDto;
  };
}
