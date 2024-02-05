import { getRequest } from '../zwift/request-get.js';

// types
import { ClubZwift } from '../../types/zwiftAPI/clubFromZwift.interface.js';
import { Club } from '../../Model/Club.js';
import { ClubSchema } from '../../types/model.interface.js';

/**
 * Сервис получение клубов из БД
 */
export const getClubsService = async (): Promise<ClubSchema[]> => {
  const clubsDB: ClubSchema[] = await Club.find();

  return clubsDB;
};

/**
 * Сервис получение данных Клуба из ZwiftAPI
 */
export const getClubService = async (id: string) => {
  const url = `clubs/club/${id}`;

  const club: ClubZwift | null = await getRequest(url);
  if (!club) {
    throw new Error(`Не найден Клуб с id:${id}`);
  }
  return club;
};

/**
 * Сервис добавления клуба в БД
 */
export const postClubService = async (club: ClubZwift) => {
  const images = {
    icon: club.images.find((image) => image.type === 'ICON')?.imageUrl,
    event: club.images.find((image) => image.type === 'EVENT')?.imageUrl,
    club_large: club.images.find((image) => image.type === 'CLUB_LARGE')?.imageUrl,
  };
  const clubDB = await Club.create({ ...club, images });

  return { message: `Клуб ${clubDB.name} добавлен в БД` };
};

/**
 * Сервис удаления клуба из БД
 */
export const deleteClubService = async (clubId: string) => {
  const clubDB = await Club.findOneAndDelete({ id: clubId });

  if (!clubDB) {
    throw new Error(`Клуб с id:${clubId} не найден в БД!`);
  }

  return { message: `Клуб ${clubDB.name} удалён из БД` };
};
