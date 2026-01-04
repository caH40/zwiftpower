import { HandlerSeries } from '../HandlerSeries.js';
import { stageResultsDto } from '../../../dto/series.js';
import { NSeriesModel } from '../../../Model/NSeries.js';

// types
import { StageResultsDto } from '../../../types/dto.interface.js';
import { GetStageResultDB } from '../../../types/mongodb-response.types.js';
import { StageResultRepository } from '../../../repositories/StageResult.js';
import { addTeamAppearance } from '../../preparation/teamAppearance.js';

/**
 * Класс работы с результатами Тура TSeriesType = 'tour' для запросов от пользователей
 * при отображении таблиц протоколов.
 */
export class TourResults extends HandlerSeries {
  private stageResultRepository = new StageResultRepository();
  constructor(public seriesId: string) {
    super(seriesId); // Вызов конструктора базового класса.
  }

  /**
   * Результаты этапа серии заездов.
   */
  public getStageResults = async (stageOrder: number): Promise<StageResultsDto> => {
    const resultsDB = await this.stageResultRepository.getAllStageResultsByEventIdFull(
      this.seriesId,
      stageOrder
    );

    const seriesDB = await NSeriesModel.findOne(
      { _id: this.seriesId },
      { stages: true }
    ).lean();

    const resultsUpdatedAt = seriesDB!.stages.find(
      (s) => s.order === stageOrder
    )?.resultsUpdatedAt;

    // Добавление данных стилизации иконки команды в результаты.
    const resultsWithTeamAppearance = await addTeamAppearance(resultsDB);

    const sortedResults = this.sortAndFilterResultsToutGroups(resultsWithTeamAppearance);

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
    const sortedResults = results.toSorted((a, b) => {
      const aResult =
        a.durationInMillisecondsWithPenalties || a.activityData.durationInMilliseconds;
      const bResult =
        b.durationInMillisecondsWithPenalties || b.activityData.durationInMilliseconds;
      return aResult - bResult;
    });

    // Разделяем на две группы.
    const validResults = sortedResults.filter((result) => !result.disqualification?.status);
    const disqualifiedResults = sortedResults.filter(
      (result) => result.disqualification?.status
    );

    // Возвращаем: сначала валидные, потом дисквалифицированные.
    return [...validResults, ...disqualifiedResults];
  };
}
