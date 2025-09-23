import { Types } from 'mongoose';

import { Organizer } from '../../Model/Organizer.js';
import { User } from '../../Model/User.js';
import { Club } from '../../Model/Club.js';
import { parseAndGroupFileNames } from '../../utils/parseAndGroupFileNames.js';
import { createUrlsToFileCloud } from '../../utils/url.js';

// types
import { TPutOrganizerMain, TResponseService } from '../../types/http.interface.js';
import { ResponseOrganizerForModerator } from '../../types/types.interface.js';
import { TOrganizer } from '../../types/model.interface.js';
import { TOrganizerMainDto } from '../../types/dto.interface.js';
import { ImagesService } from '../Images.js';

const entityName = 'organizer';

/**
 * Сервис получение данных Организатора по запросу модератора.
 */
export async function getClubZwiftModeratorService({
  organizerId,
}: {
  organizerId: string;
}): Promise<TResponseService<TOrganizerMainDto>> {
  // Получение данных организатора и клубов организатора.
  const [organizerDB, clubsDB] = await Promise.all([
    Organizer.findOne(
      { _id: organizerId },
      { createdAt: false, updatedAt: false, botZwift: false, creator: false }
    ).lean<
      Omit<TOrganizer, 'createdAt' | 'updatedAt' | 'botZwift' | 'creator'> & {
        _id: Types.ObjectId;
      }
    >(),

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

  const logoUrls = createUrlsToFileCloud(organizerDB.logoFileInfo);
  const posterUrls = createUrlsToFileCloud(organizerDB.posterFileInfo);

  const { _id, ...organizerWithId } = organizerDB;
  const id = String(_id);

  return {
    data: {
      organizer: { ...organizerWithId, organizerId: id, logoUrls, posterUrls },
      clubs: clubsDB,
    },
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

/**
 * Сервис обновления данных Организатора.
 */
export async function putOrganizerMainService({
  organizerId,
  isPublished,
  logoFile,
  posterFile,
  description,
  mission,
  clubMain,
  telegram,
  website,
  country,
  socialLinks,
}: TPutOrganizerMain): Promise<TResponseService<null>> {
  const organizerDB = await Organizer.findOne({ _id: organizerId });

  if (!organizerDB) {
    throw new Error(`Организатор с ID ${organizerId} не найден`);
  }

  const imagesService = new ImagesService();

  const { uploadedFileNamesLogo, uploadedFileNamesPoster } =
    await imagesService.imageStorageHandler({
      shortName: organizerDB.shortName.toLowerCase(),
      baseNameLogoOld: organizerDB.logoFileInfo?.baseName,
      baseNamePosterOld: organizerDB.posterFileInfo?.baseName,
      logoFile,
      posterFile,
      entitySuffix: entityName,
    });

  const logoFileInfo = parseAndGroupFileNames(uploadedFileNamesLogo);
  const posterFileInfo = parseAndGroupFileNames(uploadedFileNamesPoster);

  // Формирование объекта для обновления.
  const updateFields: Partial<typeof organizerDB> = {
    ...(logoFileInfo && { logoFileInfo }),
    ...(posterFileInfo && { posterFileInfo }),
    ...(mission && { mission }),
    ...(description && { description }),
    ...(clubMain && { clubMain }),
    ...(telegram && { telegram }),
    ...(website && { website }),
    ...(country && { country }),
    ...(socialLinks && { socialLinks }),
    ...(typeof isPublished === 'boolean' && { isPublished }),
  };

  // Применение новых данных к документу
  Object.assign(organizerDB, updateFields);

  await organizerDB.save();

  return {
    data: null,
    message: 'Успешно обновлены данные организатора!',
  };
}
