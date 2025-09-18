import { StageResultModel } from '../../../Model/StageResult.js';
import { HandlerSeries } from '../HandlerSeries.js';
import { stageResultsDto } from '../../../dto/series.js';

// types
import { TStageResult } from '../../../types/model.interface.js';
import { StageResultsDto } from '../../../types/dto.interface.js';

/**
 * Класс работы с результатами Тура TSeriesType = 'tour'
 */
export class TourResults extends HandlerSeries {
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
    }).lean<TStageResult[]>();

    const updatedAt = resultsDB[0]?.updatedAt;

    const sortedResults = this.sortAndFilterResultsToutGroups(resultsDB);

    const resultsAfterDto = stageResultsDto(sortedResults, updatedAt);

    return resultsAfterDto;
  };

  /**
   * Разделяет результаты на нормальные и дисквалифицированные, сохраняя сортировку по времени.
   * Дисквалификация может быть из-за нарушений, отсутствия финиша или невыполнения условий тура.
   */
  private sortAndFilterResultsToutGroups = (results: TStageResult[]): TStageResult[] => {
    // Сортируем все результаты по времени.
    const sortedResults = results.toSorted(
      (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
    );

    // Разделяем на две группы.
    const validResults = sortedResults.filter((result) => !result.disqualification?.status);
    const disqualifiedResults = sortedResults.filter(
      (result) => result.disqualification?.status
    );

    // Возвращаем: сначала валидные, потом дисквалифицированные.
    return [...validResults, ...disqualifiedResults];
  };
}
