// types

import { Rider } from '../Model/Rider.js';

export class RiderRepository {
  /**
   * Запрос для Team.getStatistics
   * Данные об участниках команды по массиву zwiftId.
   */
  async getRidersParams(zwiftIds: number[]): Promise<
    {
      zwiftId: number;
      male: boolean;
      medals: {
        gold: number;
        silver: number;
        bronze: number;
      };
      competitionMetrics: {
        racingScore: number;
        category: string;
        categoryWomen: string;
      } | null;
    }[]
  > {
    return await Rider.find(
      { zwiftId: { $in: zwiftIds } },
      {
        zwiftId: 1,
        male: 1,
        competitionMetrics: 1,
        medals: 1,
        _id: 0,
      }
    ).lean();
  }
}
