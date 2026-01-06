import { Types } from 'mongoose';
import { handleAndLogError } from '../../errors/error.js';
import { EventRepository } from '../../repositories/Event.js';
import { parseSeasonLabel } from '../../utils/season.js';
import { TeamSeasonRatingRepository } from '../../repositories/TeamSeasonRating.js';
import { StageResult } from './StageResult.js';
import { StandardResult } from './StandardResult.js';

export class TeamScoreAggregator {
  private eventRepository: EventRepository = new EventRepository();
  private ratingRepository: TeamSeasonRatingRepository = new TeamSeasonRatingRepository();

  /**
   * Утилита расчета рейтинговых ZP очков команды по заработанным очкам в заездах.
   * 1. Получение всех Эвентов за определенный сезон и которые являются рейтинговыми.
   * 2. Получение всех результатов заездов и результатов этапов, которые принадлежат командным
   * райдерам и у которых zpruFinishPoints > 0;
   * 3. Суммирование очков для соответствующих команд.
   * 4. Сохранение в БД.
   */

  recalculateTeamSeasonRating = async (seasonLabel: string): Promise<void> => {
    try {
      const dates = parseSeasonLabel(seasonLabel);

      if (!dates) {
        throw new Error(`Не корректное название сезона: ${seasonLabel}`);
      }

      // Рейтинговые эвенты за запрашиваемый сезон seasonLabel.
      // FIXME: разделить эвенты со стандартными результатами и эвенты с отдельными результатами за этапы серии.
      const events = await this.eventRepository.getRated(dates.start, dates.end);

      const { eventsWithStageResults, eventsWithStandardResults } = this.separateEvents(events);

      const standardResultService = new StandardResult();
      //
      const resultsWithStandardResults = await standardResultService.handle(
        eventsWithStandardResults
      );

      const stageResultsService = new StageResult();
      // Обработка результатов у которых отдельные результаты для этапов серии.
      const resultsWithSumForStageResults = await stageResultsService.handle(
        eventsWithStageResults
      );

      const assignedResults = this.assignResults(
        resultsWithStandardResults,
        resultsWithSumForStageResults
      );

      // Установка ранкинга.
      const teamSeasonRating = this.getRanking(assignedResults);

      // Сохранение в БД.
      await this.ratingRepository.upsertMany(teamSeasonRating, seasonLabel);
    } catch (error) {
      handleAndLogError(error);
    }
  };

  private assignResults = (
    resultsWithStandardResults: {
      teamId: string;
      points: number;
      eventIds: string[];
    }[],
    resultsWithSumForStageResults: {
      teamId: string;
      points: number;
      seriesIds: string[];
    }[]
  ): {
    teamId: string;
    points: number;
    eventIds: string[];
    seriesIds: string[];
  }[] => {
    // Создаем Map для быстрого поиска
    const standardMap = new Map<string, (typeof resultsWithStandardResults)[0]>();
    const stageMap = new Map<string, (typeof resultsWithSumForStageResults)[0]>();

    resultsWithStandardResults.forEach((item) => standardMap.set(item.teamId, item));
    resultsWithSumForStageResults.forEach((item) => stageMap.set(item.teamId, item));

    // Получаем все уникальные teamId
    const allTeamIds = new Set([
      ...resultsWithStandardResults.map((r) => r.teamId),
      ...resultsWithSumForStageResults.map((r) => r.teamId),
    ]);

    // Объединяем результаты для каждой команды
    return Array.from(allTeamIds).map((teamId) => ({
      teamId,
      points: (standardMap.get(teamId)?.points || 0) + (stageMap.get(teamId)?.points || 0),
      eventIds: standardMap.get(teamId)?.eventIds || [],
      seriesIds: stageMap.get(teamId)?.seriesIds || [],
    }));
  };

  private getRanking(
    results: { teamId: string; points: number; eventIds: string[]; seriesIds: string[] }[]
  ): {
    teamId: string;
    rank: number;
    points: number;
    eventIds: string[];
    seriesIds: string[];
  }[] {
    const sorted = results.toSorted((a, b) => b.points - a.points);

    return sorted.map((res, index) => ({ ...res, rank: index + 1 }));
  }

  private separateEvents(events: EventIdAndSeriesId[]) {
    return events.reduce<{
      eventsWithStageResults: EventIdAndSeriesId[];
      eventsWithStandardResults: EventIdAndSeriesId[];
    }>(
      (acc, cur) => {
        cur.seriesId?.useStageResults
          ? acc.eventsWithStageResults.push(cur)
          : acc.eventsWithStandardResults.push(cur);

        return acc;
      },
      {
        eventsWithStageResults: [],
        eventsWithStandardResults: [],
      }
    );
  }
}

type EventIdAndSeriesId = {
  _id: Types.ObjectId;
  id: number;
  seriesId?: {
    _id: Types.ObjectId;
    useStageResults?: boolean;
  };
};
