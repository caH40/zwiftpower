import { StageResultModel } from '../../../Model/StageResult.js';
import { HandlerSeries } from '../HandlerSeries.js';
import { stageResultsDto } from '../../../dto/series.js';
import { NSeriesModel } from '../../../Model/NSeries.js';

// types
import { StageResultsDto } from '../../../types/dto.interface.js';
import { GetStageResultDB } from '../../../types/mongodb-response.types.js';

/**
 * Класс работы с результатами Тура TSeriesType = 'tour' для запросов от пользователей
 * при отображении таблиц протоколов.
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

    const sortedResults = this.sortAndFilterResultsToutGroups(resultsDB);

    const resultsAfterDto = stageResultsDto(sortedResults, resultsUpdatedAt);

    return resultsAfterDto;
  };

  /**
   * Разделяет результаты на нормальные и дисквалифицированные, сохраняя сортировку по времени.
   * Дисквалификация может быть из-за нарушений, отсутствия финиша или невыполнения условий тура.
   */
  private sortAndFilterResultsToutGroups = (
    results: GetStageResultDB[]
  ): GetStageResultDB[] => {
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
