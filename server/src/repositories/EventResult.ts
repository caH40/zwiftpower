import { Types } from 'mongoose';
import { ZwiftResult } from '../Model/ZwiftResult.js';

export class EventResultRepository {
  constructor() {}

  /**
   * Результаты заездов в которых участвовали райдеры и когда был заезд.
   */
  async getStatistics(
    urlSlug: string
  ): Promise<{ zwiftEventId: { eventStart: string; _id: Types.ObjectId } }[]> {
    return await ZwiftResult.find(
      {
        $or: [
          { 'profileData.team.urlSlug': urlSlug },
          { 'profileDataMain.team.urlSlug': urlSlug },
        ],
      },
      { _id: 0, zwiftEventId: 1 }
    )
      .populate<{ zwiftEventId: { eventStart: string; _id: Types.ObjectId } }>({
        path: 'zwiftEventId',
        select: ['eventStart'],
      })
      .lean();
  }

  /**
   * Результаты заездов в которых участвовали райдеры и когда был заезд.
   */
  async getTeamRiderResults(urlSlug: string) {
    return ZwiftResult.find({
      $or: [
        { 'profileData.team.urlSlug': urlSlug },
        {
          profileDataMain: { $ne: null },
          'profileDataMain.team.urlSlug': urlSlug,
        },
      ],
    }).lean();
  }
}
