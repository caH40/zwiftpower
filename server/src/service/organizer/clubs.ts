import { ObjectId } from 'mongoose';

import { Club } from '../../Model/Club.js';
import { TResponseService } from '../../types/http.interface.js';
import { TClubsZwiftDto, TResponseClubsFromDB } from '../../types/types.interface.js';
import { transformClubsZwiftToDto } from '../../dto/clubsZwift.js';

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
