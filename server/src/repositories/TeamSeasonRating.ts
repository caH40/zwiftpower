import { Types } from 'mongoose';

import { TeamSeasonRatingModel } from '../Model/TeamSeasonRating.js';

// types
import { TTeam, TTeamSeasonRating } from '../types/model.interface.js';

export class TeamSeasonRatingRepository {
  async get(teamId: string, season: string) {
    return TeamSeasonRatingModel.findOne({ team: teamId, season }, { eventsIds: 0 }).lean<
      Omit<TTeamSeasonRating, 'eventsIds'>
    >();
  }

  async getAll(season: string) {
    return TeamSeasonRatingModel.find({ season }, { eventsIds: 0 })
      .populate({ path: 'team', select: ['urlSlug', '-_id'] })
      .sort({ rank: 1 })
      .lean<
        (Omit<TTeamSeasonRating, 'eventsIds' | 'team'> & { team: { urlSlug: string } })[]
      >();
  }

  /**
   * Первые три команды в рейтинге.
   */
  async getTop(seasonLabel: string) {
    return TeamSeasonRatingModel.find(
      { season: seasonLabel, rank: { $in: [1, 2, 3] } },
      { eventsIds: 0 }
    )
      .populate({ path: 'team' })
      .sort({ rank: 1 })
      .lean<(Omit<TTeamSeasonRating, 'team'> & { team: TTeam })[]>();
  }

  async upsertMany(
    items: {
      teamId: string;
      rank: number;
      points: number;
      eventIds: string[];
      seriesIds: string[];
    }[],
    season: string
  ): Promise<void> {
    if (!items.length) return;

    await TeamSeasonRatingModel.bulkWrite(
      items.map((item) => ({
        updateOne: {
          filter: {
            team: new Types.ObjectId(item.teamId),
            season,
          },
          update: {
            $set: {
              rank: item.rank,
              points: item.points,
              eventsIds: item.eventIds.map((id) => new Types.ObjectId(id)),
              seriesIds: item.seriesIds.map((id) => new Types.ObjectId(id)),
            },
          },
          upsert: true,
        },
      })),
      { ordered: false }
    );
  }

  /**
   * Список эвентов, результаты которых учитываются в рейтинге команды.
   */
  getResultEvents({ seasonLabel, teamId }: { seasonLabel: string; teamId: string }) {
    return TeamSeasonRatingModel.findOne(
      { season: seasonLabel, team: teamId },
      { eventsIds: 1, seriesIds: 1, _id: 0 }
    ).lean<{ eventsIds: Types.ObjectId[]; seriesIds: Types.ObjectId[] }>();
  }
}
