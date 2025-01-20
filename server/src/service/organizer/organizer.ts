import { Types } from 'mongoose';

import { Organizer } from '../../Model/Organizer.js';
import { User } from '../../Model/User.js';
import { Club } from '../../Model/Club.js';

// types
import { TResponseService } from '../../types/http.interface.js';
import { ResponseOrganizerForModerator } from '../../types/types.interface.js';
import { TOrganizer, TOrganizerMainDto } from '../../types/model.interface.js';

/**
 * Сервис получение данных Организатора по запросу модератора.
 */
export async function getClubZwiftModeratorService({
  organizerId,
}: {
  organizerId: string;
}): Promise<TResponseService<TOrganizerMainDto>> {
  // Получение данных организатора.
  // Получение клубов организатора.
  const [organizerDB, clubsDB] = await Promise.all([
    Organizer.findOne(
      { _id: organizerId },
      { _id: false, createdAt: false, updatedAt: false, botZwift: false, creator: false }
    ).lean<Omit<TOrganizer, '_id' | 'createdAt' | 'updatedAt' | 'botZwift' | 'creator'>>(),

    Club.find({ organizer: organizerId }, { _id: false, id: true, name: true }).lean<
      {
        name: string;
        id: string;
      }[]
    >(),
  ]);

  if (!organizerDB) {
    throw new Error(`Не найден запрашиваемый Организатор с _id:${organizerId}`);
  }

  return {
    data: { organizer: organizerDB, clubs: clubsDB },
    message: 'Получены клубы запрашиваемого организатора.',
  };
}

/**
 * Сервис получение Организаторов у которых пользователь userId является модератором.
 */
export async function getOrganizersForModeratorService({
  userId,
}: {
  userId: string; // _id пользователя User, который является модератором у Организатора(ов).
}): Promise<TResponseService<ResponseOrganizerForModerator[]>> {
  const userDB = await User.findOne(
    { _id: userId },
    { 'moderator.clubs': true, _id: false }
  ).lean<{ moderator: { clubs: string[] } }>();

  if (!userDB) {
    throw new Error(`Не найден пользователь с _id:${userId} в модуле getOrganizersIdsService`);
  }

  const clubsDB = await Club.find(
    { id: { $in: userDB.moderator.clubs } },
    { organizer: true, _id: false }
  ).lean<{ organizer: Types.ObjectId }[]>();

  const organizersDB = await Organizer.find(
    { _id: clubsDB.map((elm) => elm.organizer) },
    { name: true }
  ).lean<{ _id: Types.ObjectId; name: string }[]>();

  const organizers = new Map<string, ResponseOrganizerForModerator>(
    organizersDB.map((elm) => [String(elm._id), { _id: String(elm._id), name: elm.name }])
  );

  return {
    data: [...organizers.values()],
    message: 'Получены _id организаторов, в клубах которых пользователь является модератором.',
  };
}
