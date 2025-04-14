import { stageResultsDto } from '../../../dto/series.js';
import { StageResultModel } from '../../../Model/StageResult.js';
import { StageResultDto } from '../../../types/dto.interface.js';
import { TStageResult } from '../../../types/model.interface.js';
import { HandlerSeries } from '../HandlerSeries.js';

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
  public getStageResults = async (stageOrder: number): Promise<StageResultDto[]> => {
    const resultsDB = await StageResultModel.find({
      series: this.seriesId,
      order: stageOrder,
    }).lean<TStageResult[]>();

    const resultsAfterDto = resultsDB.map((result) => stageResultsDto(result));

    const sortedResults = this.sortAndFilterResultsGroups(resultsAfterDto);

    return resultsAfterDto;
  };

  /**
   * Разделяет результаты на нормальные и дисквалифицированные, сохраняя сортировку по времени.
   * Дисквалификация может быть из-за нарушений, отсутствия финиша или невыполнения условий тура.
   */
  public sortAndFilterResultsGroups = (results: StageResultDto[]): StageResultDto[] => {
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

  /**
   * Вычисление и добавление отставаний в результаты: gap-до лидера, gapPrev до райдера впереди
   */
  // gapValue = (
  //   results: StageResultDto[],
  //   typeGap: 'absolute' | 'category'
  // ): StageResultDto[] => {
  //   const lengthResult = results.length;

  //   for (let i = 1; i < lengthResult; i++) {
  //     results[i].gaps[typeGap].leader =
  //       results[i].activityData.durationInMilliseconds -
  //       results[0].activityData.durationInMilliseconds;

  //     if (i !== lengthResult)
  //       results[i].gaps[typeGap].prev =
  //         results[i].activityData.durationInMilliseconds -
  //         results[i - 1].activityData.durationInMilliseconds;
  //   }

  //   return results;
  // };
}
