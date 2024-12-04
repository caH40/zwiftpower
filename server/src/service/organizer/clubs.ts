import { ObjectId } from 'mongoose';

import { Club } from '../../Model/Club.js';
import { TResponseService } from '../../types/http.interface.js';
import { TClubsZwiftDto, TResponseClubsFromDB } from '../../types/types.interface.js';
import { transformClubsZwiftToDto } from '../../dto/clubsZwift.js';
import { ClubZwift } from '../../types/zwiftAPI/clubFromZwift.interface.js';
import { getRequest } from '../zwift/request-get.js';
import { ZwiftToken } from '../../Model/ZwiftToken.js';
import { User } from '../../Model/User.js';

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

  if (!club) {
    throw new Error(`Не найден Клуб с id:${clubId} в ZwiftAPI!`);
  }

  return { data: club, message: 'Получены данные клуба из ZwiftAPI' };
}

/**
 * Сервис добавления клуба в БД для Организатора.
 */
export async function postClubsZwiftService({
  club,
  organizerId,
}: {
  club: ClubZwift;
  organizerId: string;
}): Promise<TResponseService<null>> {
  const images = {
    icon: club.images.find((image) => image.type === 'ICON')?.imageUrl,
    event: club.images.find((image) => image.type === 'EVENT')?.imageUrl,
    club_large: club.images.find((image) => image.type === 'CLUB_LARGE')?.imageUrl,
  };

  const clubCandidate = await Club.findOne({
    id: club.id,
    organizer: organizerId,
  });

  if (clubCandidate) {
    throw new Error(`Данный клуб "${club.name}" уже добавлен Организатору!`);
  }

  const clubDB = await Club.create({
    ...club,
    images,
    organizer: organizerId,
  });

  if (!clubDB?.id) {
    throw new Error(`Ошибка создания клуба с id:${club.id}`);
  }

  return { data: null, message: `Добавлен клуб "${clubDB.name}" в БД!` };
}

/**
 * Сервис добавления пользователя в модераторы для клуба.
 */
export const addClubModeratorService = async ({
  clubId,
  userId,
}: {
  clubId: string;
  userId: string;
}) => {
  // Добавление клуба в список клубов для модерации в документе User.
  const userDB = await User.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { 'moderator.clubs': clubId } }
  );

  if (!userDB) {
    throw new Error(`Пользователь id:${userId} не найден в БД!`);
  }

  // Добавление userId в список модераторов клуба.
  const clubDB = await Club.findOneAndUpdate(
    { id: clubId },
    { $addToSet: { moderators: userId } }
  );

  if (!clubDB) {
    throw new Error(`Не найден клуб с id:${clubId}`);
  }

  return {
    message: `Пользователь "${userDB.username}" добавлен модератором для клуба "${clubDB.name}"`,
  };
};

/**
 * Сервис удаления пользователя из модераторов клуба.
 */
export const deleteClubModeratorService = async ({
  clubId,
  userId,
}: {
  clubId: string;
  userId: string;
}) => {
  // Удаление клуба из списка клубов для модерации в документе User.
  const userDB = await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { 'moderator.clubs': clubId } }
  );

  if (!userDB) {
    throw new Error(`Пользователь id:${userId} не был найден в БД`);
  }

  // Удаление userId из списка модераторов клуба.
  const clubDB = await Club.findOneAndUpdate({ id: clubId }, { $pull: { moderators: userId } });

  if (!clubDB) {
    throw new Error(`Не найден клуб с id:${clubId}`);
  }

  return {
    message: `Пользователь "${userDB.username}" удалён из модераторов для клуба "${clubDB.name}"`,
  };
};
