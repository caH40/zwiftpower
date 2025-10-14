import { ZwiftResult } from '../Model/ZwiftResult.js';

export class EventResultRepository {
  constructor() {}

  /**
   * Результаты заездов в которых участвовали райдеры и когда был заезд.
   */
  async getStatistics(urlSlug: string): Promise<{ zwiftEventId: { eventStart: string } }[]> {
    return await ZwiftResult.find(
      {
        $or: [
          { 'profileData.team.urlSlug': urlSlug },
          { 'profileDataMain.team.urlSlug': urlSlug },
        ],
      },
      { _id: 0, zwiftEventId: 1 }
    )
      .populate<{ zwiftEventId: { eventStart: string } }>({
        path: 'zwiftEventId',
        select: ['eventStart'],
      })
      .lean();
  }
}
