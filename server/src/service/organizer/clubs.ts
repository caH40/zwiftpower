import { ObjectId } from 'mongoose';

import { Club } from '../../Model/Club.js';
import { TResponseService } from '../../types/http.interface.js';
import { TClubsZwiftDto, TResponseClubsFromDB } from '../../types/types.interface.js';
import { transformClubsZwiftToDto } from '../../dto/clubsZwift.js';
import { ClubZwift } from '../../types/zwiftAPI/clubFromZwift.interface.js';
import { getRequest } from '../zwift/request-get.js';
import { ZwiftToken } from '../../Model/ZwiftToken.js';

/**
 * Сервис получение клубов из БД для Организатора.
 */
export async function getClubsZwiftService({
  organizerId,
}: {
  organizerId: string;
}): Promise<TResponseService<TClubsZwiftDto[]>> {
  const clubsDB = await Club.find({ organizer: organizerId })
    .populate({
      path: 'moderators',
      select: ['username', 'zwiftId'],
    })
    .populate({ path: 'organizer', select: 'name' })
    .lean<(TResponseClubsFromDB & { _id: ObjectId })[]>();

  const clubsAfterDTO = transformClubsZwiftToDto(clubsDB);

  return { data: clubsAfterDTO, message: 'Получены клубы запрашиваемого организатора.' };
}

/**
 * Сервис удаление клуба из БД для Организатора.
 */
export async function deleteClubsZwiftService({
  clubId,
}: {
  clubId: string;
}): Promise<TResponseService<null>> {
  const clubsDB = await Club.findOneAndDelete({ id: clubId }).lean<{ _id: ObjectId }>();

  if (!clubsDB) {
    throw new Error(`Не найден клуб с id:${clubId}`);
  }

  return { data: null, message: `Удалён клуб с id:${clubId} из БД!` };
}

/**
 * Сервис получение данных Клуба из ZwiftAPI.
 */
export async function getClubZwiftService({
  clubId,
  organizerId,
}: {
  clubId: string;
  organizerId: ObjectId;
}): Promise<TResponseService<ClubZwift>> {
  // Получение токена организатора.

  const tokenDB = await ZwiftToken.findOne(
    { organizer: organizerId },
    { token: true, _id: false }
  ).lean<{
    token: string;
  }>();

  if (!tokenDB) {
    throw new Error('Не найдет token доступа для бота-модератора клубов в Zwift!');
  }

  const url = `clubs/club/${clubId}`;

  const club: ClubZwift | null = await getRequest(url, true, tokenDB.token);
  console.log(club);

  if (!club) {
    throw new Error(`Не найден Клуб с id:${clubId} в ZwiftAPI!`);
  }

  return { data: club, message: 'Получены данные клуба из ZwiftAPI' };
}
