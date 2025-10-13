import { Types } from 'mongoose';

import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { setStartOfDay } from '../../utils/date-local.js';
import { handleAndLogError } from '../../errors/error.js';
import { TeamModel } from '../../Model/Team.js';
import { User } from '../../Model/User.js';

/**
 * Обновление принадлежности к команде участника заезда. (Временная функция при формировании команды)
 * @param userId - id пользователя на сайте.
 * @param team - Данные о команде.
 */
type TeamAction = 'add' | 'remove';

export async function updateTeamInResultsService(
  userId: string,
  actualDate: Date,
  action: TeamAction,
  teamId?: string
): Promise<void> {
  try {
    const userDB = await User.findById(userId, { zwiftId: 1, _id: 0 }).lean();

    if (!userDB) {
      throw new Error(`Не найден пользователь с _id: "${userId}"`);
    }

    if (!userDB.zwiftId) {
      throw new Error(
        `Обязательная привязка zwiftId к аккаунту пользователь с _id: "${userId} для добавления информации о команде в результат заезда!"`
      );
    }

    const teamDB = await TeamModel.findById(teamId, {
      _id: 0,
      name: 1,
      shortName: 1,
      urlSlug: 1,
    }).lean();

    if (teamId && !teamDB) {
      throw new Error(`Не найдена команда с _id: "${teamId}"`);
    }

    const currentActualDate = setStartOfDay(new Date(actualDate)).toISOString();

    const eventsDB = await ZwiftEvent.find(
      { eventStart: { $gte: currentActualDate } },
      { _id: 1 }
    ).lean<{ _id: Types.ObjectId }[]>();

    const eventIds = eventsDB.map(({ _id }) => _id);
    const value = action === 'add' ? teamDB : null;
    await ZwiftResult.updateMany(
      { zwiftEventId: { $in: eventIds }, profileId: userDB.zwiftId },
      { $set: { 'profileData.team': value } }
    );

    await ZwiftResult.updateMany(
      {
        zwiftEventId: { $in: eventIds },
        profileId: userDB.zwiftId,
        profileDataMain: { $ne: null },
      },
      { $set: { 'profileDataMain.team': value } }
    );
  } catch (error) {
    handleAndLogError(error);
  }
}
