import { getRequest } from '../zwift/api/request-get.js';

// types
import { ClubZwift } from '../../types/zwiftAPI/clubFromZwift.interface.js';
import { Club } from '../../Model/Club.js';
import { ClubSchema, TClubZwift } from '../../types/model.interface.js';
import { User } from '../../Model/User.js';
import { Types } from 'mongoose';

/**
 * Сервис получение клубов из БД
 */
export const getClubsService = async (): Promise<ClubSchema[]> => {
  const clubsDB: ClubSchema[] = await Club.find()
    .populate({
      path: 'moderators',
      select: ['username', 'zwiftId'],
    })
    .populate({ path: 'organizer', select: 'name' })
    .lean();

  return clubsDB;
};

/**
 * Сервис получение данных Клуба из ZwiftAPI.
 * Доступ данных к клубу в ZwiftAPI разрешается любым пользователям.
 */
export const getClubService = async (id: string) => {
  const url = `clubs/club/${id}`;

  const club: ClubZwift | null = await getRequest({ url });
  if (!club) {
    throw new Error(`Не найден Клуб с id:${id}`);
  }
  return club;
};

/**
 * Сервис добавления клуба в БД
 */
export const postClubService = async (club: ClubZwift, organizerId: string) => {
  const images = {
    icon: club.images.find((image) => image.type === 'ICON')?.imageUrl,
    event: club.images.find((image) => image.type === 'EVENT')?.imageUrl,
    club_large: club.images.find((image) => image.type === 'CLUB_LARGE')?.imageUrl,
  };
  const clubDB = await Club.create({ ...club, images, organizer: organizerId });

  return { message: `Клуб ${clubDB.name} добавлен в БД` };
};

/**
 * Сервис удаления клуба из БД
 */
export const deleteClubService = async (clubId: string) => {
  const clubDB = await Club.findOneAndDelete({ id: clubId }).lean<TClubZwift>();

  if (!clubDB) {
    throw new Error(`Клуб с id:${clubId} не найден в БД!`);
  }

  await User.updateMany(
    { 'moderator.clubs': clubDB.id },
    { $pull: { 'moderator.clubs': clubDB.id } }
  );

  return { message: `Клуб ${clubDB.name} удалён из БД` };
};

/**
 * Сервис добавление модератора для клуба
 */
export const addClubModeratorService = async (clubId: string, userId: string) => {
  // добавления userId в клуб
  // clubId - id присвоенный клубу в Звифте
  // userId - ObjectId из БД
  const clubDB = await Club.findOneAndUpdate(
    { id: clubId },
    { $addToSet: { moderators: userId } }
  );

  if (!clubDB) {
    throw new Error(`Не найден клуб с id:${clubId}`);
  }

  // добавления userId в клуб
  const userDB = await User.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { 'moderator.clubs': clubId } }
  );

  if (!userDB) {
    throw new Error(
      `Пользователь id:${userId} был добавлен в клуб id:${clubId}, но не был найден в БД`
    );
  }

  return {
    message: `Пользователь "${userDB.username}" добавлен модератором для клуба "${clubDB.name}"`,
  };
};

/**
 * Сервис исключения модератора из клуба
 */
export const deleteClubModeratorService = async (clubId: string, userId: string) => {
  // удаление userId из клуба
  // clubId - id присвоенный клубу в Звифте
  // userId - ObjectId из БД
  const clubDB = await Club.findOneAndUpdate({ id: clubId }, { $pull: { moderators: userId } });

  if (!clubDB) {
    throw new Error(`Не найден клуб с id:${clubId}`);
  }

  // добавления userId в клуб
  const userDB = await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { 'moderator.clubs': clubId } }
  );

  if (!userDB) {
    throw new Error(
      `Пользователь id:${userId} был удален из модераторов клуба id:${clubId}, но не был найден в БД`
    );
  }

  return {
    message: `Пользователь "${userDB.username}" был удален из модераторов клуба "${clubDB.name}"`,
  };
};

/**
 * Сервис обновление данных клуба из Zwift API и сохранение обновленных данных в БД.
 */
export const updateClubService = async (clubId: string) => {
  const club = await getClubService(clubId);

  if (!club) {
    throw new Error(`Не найден клуб с id:${clubId} в Zwift API`);
  }

  const images = {
    icon: club.images.find((image) => image.type === 'ICON')?.imageUrl,
    event: club.images.find((image) => image.type === 'EVENT')?.imageUrl,
    club_large: club.images.find((image) => image.type === 'CLUB_LARGE')?.imageUrl,
  };

  const clubDB = await Club.findOneAndUpdate(
    { id: clubId },
    { $set: { ...club, images } },
    { new: true, projection: { name: true } }
  ).lean<{
    _id: Types.ObjectId;
    name: string;
  }>();

  if (!clubDB) {
    throw new Error(`Не найден клуб с id:${clubId}`);
  }

  return {
    message: `Обновлены данные клуба "${clubDB.name}"`,
  };
};
