import { Types } from 'mongoose';
import { ZwiftResult } from '../Model/ZwiftResult.js';

export class EventResultRepository {
  constructor() {}

  /**
   * Результаты заездов в которых участвовали райдеры и когда был заезд.
   */
  async getStatistics(
    teamUrlSlug: string
  ): Promise<{ zwiftEventId: { eventStart: string; _id: Types.ObjectId } }[]> {
    return await ZwiftResult.find(
      {
        $or: [
          { 'profileData.team.urlSlug': teamUrlSlug },
          { 'profileDataMain.team.urlSlug': teamUrlSlug },
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
   * Результаты заездов в которых участвовали райдеры, являющиеся участниками команд.
   */
  async getForTeamLeaderBoards(): Promise<
    {
      rank: number;
      profileData?: { team?: { urlSlug: string } };
      profileDataMain?: { team?: { urlSlug: string } };
    }[]
  > {
    return await ZwiftResult.find(
      {
        $or: [
          { 'profileData.team.urlSlug': { $exists: true, $ne: null } },
          { 'profileDataMain.team.urlSlug': { $exists: true, $ne: null } },
        ],
      },
      {
        _id: 0,
        'profileData.team.urlSlug': 1,
        'profileDataMain.team.urlSlug': 1,
        rank: 1,
      }
    ).lean();
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
