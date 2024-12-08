import { ObjectId } from 'mongoose';

// types
import { TClubsZwiftDto, TResponseClubsFromDB } from '../types/types.interface.js';

/**
 * Дто для сервиса получения клубов звифта для организатора для отправки на клиент.
 */
export function transformClubZwiftToDto(
  club: TResponseClubsFromDB & { _id: ObjectId }
): TClubsZwiftDto {
  const _id = String(club._id);
  const moderators = club.moderators.map((moderator) => ({
    _id: String(moderator._id),
    username: moderator.username,
    zwiftId: moderator.zwiftId,
  }));

  return { ...club, _id, moderators };
}

/**
 * Дто для сервиса получения клубов звифта для организатора для отправки на клиент.
 */
export function transformClubsZwiftToDto(
  clubs: (TResponseClubsFromDB & { _id: ObjectId })[]
): TClubsZwiftDto[] {
  return clubs.map((club) => transformClubZwiftToDto(club));
}
