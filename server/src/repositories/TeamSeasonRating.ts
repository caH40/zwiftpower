import { Types } from 'mongoose';

import { TeamSeasonRatingModel } from '../Model/TeamSeasonRating.js';

export class TeamSeasonRatingRepository {
  async upsertMany(
    items: {
      teamId: string;
      rank: number;
      points: number;
      eventIds: string[];
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
            },
          },
          upsert: true,
        },
      })),
      { ordered: false }
    );
  }
}
