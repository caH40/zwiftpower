import { StageResultModel } from '../../../Model/StageResult.js';
import { HandlerSeries } from '../HandlerSeries.js';
import { stageResultsDto } from '../../../dto/series.js';
import { NSeriesModel } from '../../../Model/NSeries.js';

// types
import { StageResultsDto } from '../../../types/dto.interface.js';
import { GetStageResultDB } from '../../../types/mongodb-response.types.js';

/**
 * Класс работы с результатами Эндуренс TSeriesType = 'endurance' для запросов от пользователей
 * при отображении таблиц протоколов.
 */
export class EnduranceResults extends HandlerSeries {
  constructor(public seriesId: string) {
    super(seriesId); // Вызов конструктора базового класса.
  }

  /**
   * Результаты этапа серии заездов.
   */
  public getStageResults = async (stageOrder: number): Promise<StageResultsDto> => {
    const resultsDB = await StageResultModel.find({
      series: this.seriesId,
      order: stageOrder,
    })
      .populate({ path: 'modifiedCategory.moderator', select: ['-_id', 'username'] })
      .lean<GetStageResultDB[]>();

    const seriesDB = await NSeriesModel.findOne(
      { _id: this.seriesId },
      { stages: true }
    ).lean();

    const resultsUpdatedAt = seriesDB!.stages.find(
      (s) => s.order === stageOrder
    )?.resultsUpdatedAt;

    const sortedResults = this.sortAndFilterResultsGroups(resultsDB);

    const resultsAfterDto = stageResultsDto(sortedResults, resultsUpdatedAt);

    return resultsAfterDto;
  };

  /**
   * Разделяет результаты на нормальные и дисквалифицированные, сохраняя сортировку по абсолютному ранку.
   * Дисквалификация может быть из-за нарушений, отсутствия финиша или невыполнения условий тура.
   */
  private sortAndFilterResultsGroups = (results: GetStageResultDB[]): GetStageResultDB[] => {
    // Сортируем все результаты по времени.
    const sortedResults = results.toSorted((a, b) => a.rank.absolute - b.rank.absolute);

    // Разделяем на две группы.
    const validResults = sortedResults.filter((result) => !result.disqualification);
    const disqualifiedResults = sortedResults.filter((result) => result.disqualification);

    // Возвращаем: сначала валидные, потом дисквалифицированные.
    return [...validResults, ...disqualifiedResults];
  };
}
