import { QueryOptions, Types } from 'mongoose';
import { ZwiftResult } from '../Model/ZwiftResult.js';

// types
import { ZwiftResultSchema } from '../types/model.interface.js';

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
   * Исключены заезды в которых райдер дисквалифицирован.
   */
  // async getForTeamLeaderBoards(
  //   start: Date,
  //   end: Date
  // ): Promise<
  //   {
  //     rankEvent: number;
  //     profileData?: { team?: { urlSlug: string } };
  //     profileDataMain?: { team?: { urlSlug: string } };
  //   }[]
  // > {
  //   return await ZwiftResult.find(
  //     {
  //       $and: [
  //         {
  //           $or: [
  //             { 'profileData.team.urlSlug': { $exists: true, $ne: null } },
  //             { 'profileDataMain.team.urlSlug': { $exists: true, $ne: null } },
  //           ],
  //         },
  //         { $or: [{ isDisqualification: false }, { isDisqualification: null }] },
  //       ],
  //     },
  //     {
  //       _id: 0,
  //       'profileData.team.urlSlug': 1,
  //       'profileDataMain.team.urlSlug': 1,
  //       rankEvent: 1,
  //     }
  //   ).lean();
  // }

  /**
   * Результаты заездов в которых участвовали райдеры, являющиеся участниками команд и которые
   * заработали очки zpruFinishPoints
   */
  async getForTeamSeasonRating(eventIds: Types.ObjectId[]): Promise<
    {
      zwiftEventId: Types.ObjectId;
      points: { zpruFinishPoints: number };
      profileData?: { team?: { urlSlug: string } };
      profileDataMain?: { team?: { urlSlug: string } };
    }[]
  > {
    return ZwiftResult.find(
      {
        zwiftEventId: { $in: eventIds },
        $and: [
          {
            $or: [
              { 'profileData.team.urlSlug': { $exists: true, $ne: null } },
              { 'profileDataMain.team.urlSlug': { $exists: true, $ne: null } },
            ],
          },
          { 'points.zpruFinishPoints': { $gt: 0 } },
        ],
      },
      {
        _id: 0,
        zwiftEventId: 1,
        'profileData.team.urlSlug': 1,
        'profileDataMain.team.urlSlug': 1,
        'points.zpruFinishPoints': 1,
      }
    ).lean<
      {
        zwiftEventId: Types.ObjectId;
        points: { zpruFinishPoints: number };
        profileData?: { team?: { urlSlug: string } };
        profileDataMain?: { team?: { urlSlug: string } };
      }[]
    >();
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

  /**
   * Результаты заездов в которых участвовали райдеры в определенных эвентах.
   */
  async getTeamRiderResultsByEventIds(urlSlug: string, zwiftEventIds: Types.ObjectId[]) {
    return ZwiftResult.find({
      zwiftEventIds: { $in: zwiftEventIds },
      $or: [
        { 'profileData.team.urlSlug': urlSlug, 'points.zpruFinishPoints': { $gt: 0 } },
        {
          profileDataMain: { $ne: null },
          'profileDataMain.team.urlSlug': urlSlug,
          'points.zpruFinishPoints': { $gt: 0 },
        },
      ],
    }).lean();
  }

  /**
   * Результаты заездов Эвента.
   */
  async getByEventId(eventId: string): Promise<ZwiftResultSchema[]> {
    return ZwiftResult.find({ zwiftEventId: eventId }).lean();
  }

  /**
   * Обновление результатов заезда.
   */
  async updateMany(updates: { _id: string; query: QueryOptions<ZwiftResultSchema> }[]) {
    return ZwiftResult.bulkWrite(
      updates.map((u) => ({
        updateOne: {
          filter: { _id: u._id },
          update: { $set: u.query },
        },
      }))
    );
  }
}
