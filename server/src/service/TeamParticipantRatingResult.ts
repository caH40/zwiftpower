import { Types } from 'mongoose';

import { EventResultRepository } from '../repositories/EventResult.js';
import { TeamRepository } from '../repositories/Team.js';
import { FIRST_RATED_PLACES, importanceCoefficients } from '../assets/racePoints.js';
import { parseSeasonLabel } from '../utils/season.js';
import { TeamSeasonRatingRepository } from '../repositories/TeamSeasonRating.js';
import { EventRepository } from '../repositories/Event.js';

// types
import { TTeamParticipantRatingResult } from '../types/types.interface.js';
import { TSeriesStage, ZwiftResultSchema } from '../types/model.interface.js';
import { TImportanceCoefficientsLevels } from '../types/points.types.js';
import { TResponseService } from '../types/http.interface.js';
import { PointsCalculator } from './RacePoints/PointsCalculator.js';

/**
 * Класс формирования таблицы результатов участников команды за выбранный сезон, результаты
 * которых учитываются в рейтинге среди команд.
 */
export class TeamParticipantRatingResult {
  private teamRepository: TeamRepository = new TeamRepository();
  private eventResultRepository: EventResultRepository = new EventResultRepository();
  private ratingRepository: TeamSeasonRatingRepository = new TeamSeasonRatingRepository();
  private eventRepository: EventRepository = new EventRepository();
  private pointsCalculator: PointsCalculator = new PointsCalculator();

  constructor() {}

  /**
   * Формирование таблицы результатов участников команды за выбранный сезон, результаты
   * которых учитываются в рейтинге среди команд.
   * 1. Получить эвенты, результаты которых учитывались в рейтинге;
   * 2. Получить соответствующие результаты эвентов. Определять результаты стандартные или результаты этапов;
   * 3. Сформировать таблицу с сортировкой от более новых к более старым результатам;
   */
  getTeamAllResults = async ({
    seasonLabel,
    teamUrlSlug,
  }: {
    seasonLabel: string;
    teamUrlSlug: string;
  }): Promise<TResponseService<TTeamParticipantRatingResult[]>> => {
    const team = await this.teamRepository.getByUrlSlug(teamUrlSlug, { _id: 1 });

    if (!team) {
      throw new Error(`Не найдена команда с urlSlug: ${teamUrlSlug}`);
    }

    const dates = parseSeasonLabel(seasonLabel);

    if (!dates) {
      throw new Error(`Не корректное название сезона: ${seasonLabel}`);
    }

    // Эвенты по результатам которых формировался финальная сумма очков для рейтинга.
    const resultEvents = await this.ratingRepository.getResultEvents({
      seasonLabel,
      teamId: team._id.toString(),
    });

    if (!resultEvents?.eventsIds) {
      return {
        data: [],
        message: `Не найдены результаты участников команды за сезон ${seasonLabel}`,
      };
    }

    // Получение seriesId для эвентов, входящих в серии заездов.
    const eventsWithSeriesIds = await this.eventRepository.getRatedForTeam(
      resultEvents.eventsIds
    );

    // Разделение стандартных результатов и отдельные результаты за этапы.
    const { eventsWithStandardResults } = this.separateEvents(eventsWithSeriesIds);

    // Результаты из БД.
    const results = await this.eventResultRepository.getTeamRiderResultsByEventIds(
      teamUrlSlug,
      eventsWithStandardResults.map((e) => e._id)
    );

    const teamParticipantRatingResult = this.structureStandardResults(
      results,
      eventsWithStandardResults
    );

    // console.log(teamParticipantRatingResult.reduce<number>((acc, cur) => acc + cur.points, 0));

    teamParticipantRatingResult.sort(
      (a, b) => new Date(b.event.start).getTime() - new Date(a.event.start).getTime()
    );

    return {
      data: teamParticipantRatingResult,
      message: `Рейтинговые результаты участников команды за сезон ${seasonLabel}`,
    };
  };

  structureStandardResults = (
    results: ZwiftResultSchema[],
    eventsWithStageResults: {
      _id: Types.ObjectId;
      id: number;
      name: string;
      eventStart: string;
      typeRaceCustom: string;
      importanceLevel?: TImportanceCoefficientsLevels;
      seriesId?: {
        useStageResults?: boolean;
        stages: TSeriesStage[];
        name: string;
        urlSlug: string;
      };
    }[]
  ): TTeamParticipantRatingResult[] => {
    // Создание структуры данных Мап.
    const eventsMap = new Map(eventsWithStageResults.map((e) => [e._id.toString(), e]));

    let index = 0;

    // Инициализация итогового массива.
    const teamParticipantRatingResult = [];

    for (const result of results) {
      // Лишняя проверка, только для ts, так как points должен быть.
      const points = result.points?.zpruFinishPoints;
      if (points == null) {
        continue;
      }
      //  Не нужны результаты с местами, которым не присваиваются рейтинговые очки zpru.
      if (result.rankEvent > FIRST_RATED_PLACES) {
        continue;
      }

      const eventId = result.zwiftEventId.toString();
      const eventData = eventsMap.get(eventId);

      // По какой то причине не найден эвент.
      if (!eventData) {
        continue;
      }

      // Формирование данных Эвента.
      const event = {
        id: eventData.id,
        name: eventData.name,
        start: eventData.eventStart,
      };

      // Номер этапа в котором показан результат.
      const stageOrder = eventData.seriesId?.stages.find((st) =>
        st.event.equals(eventId)
      )?.order;

      // Формирование данных серии и номера этапа в серии в котором показан данный результат.
      const series = eventData.seriesId
        ? {
            name: eventData.seriesId.name,
            urlSlug: eventData.seriesId.urlSlug,
            stageOrder,
          }
        : null;

      // Коэффициент важности заезда.
      const importance =
        importanceCoefficients.find((e) => e.level === eventData.importanceLevel)
          ?.coefficient ?? 0;

      // В эвенте деление по группам или абсолютный финишный протокол.
      const isCategoryResult = ['classicGroup', 'newbies'].includes(eventData.typeRaceCustom);

      const finishersCount = isCategoryResult
        ? result.finishersCount.category
        : result.finishersCount.absolute;

      // Коэффициент массовости группы/заезда.
      const mass = this.pointsCalculator.getMassCoefficient(finishersCount);

      const coefficients = {
        importance,
        mass,
      };

      const id = index++;
      const rank = result.rankEvent;
      const profileData = result.profileDataMain || result.profileData;

      const stageResultPath =
        eventData.seriesId && stageOrder
          ? `/series/${eventData.seriesId?.urlSlug}/results/stage/${stageOrder}`
          : null;
      const resultPath = eventData.seriesId?.useStageResults
        ? stageResultPath
        : `/race/results/${eventData.id}`;

      teamParticipantRatingResult.push({
        id,
        points,
        rank,
        profileData,
        event,
        series,
        resultPath,
        coefficients,
      });
    }

    return teamParticipantRatingResult;
  };

  /**
   * Разделение стандартных результатов и отдельные результаты за этапы.
   */
  private separateEvents<T extends { seriesId?: { useStageResults?: boolean } }>(events: T[]) {
    return events.reduce<{
      eventsWithStageResults: T[];
      eventsWithStandardResults: T[];
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
