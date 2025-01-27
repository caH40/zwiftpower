import slugify from 'slugify';

import { Organizer } from '../../Model/Organizer.js';

// types
import { OrganizerSchema, TOrganizer } from '../../types/model.interface.js';
import { handleAndLogError } from '../../errors/error.js';

/**
 * Сервис получения всех Организаторов заезда
 */
export const getOrganizersService = async (): Promise<OrganizerSchema[]> => {
  const organizersDB = await Organizer.find().populate('creator').lean();

  // Проверка на случай возможного удаления User из БД, который создавал Организатора.
  if (organizersDB.length) {
    for (const organizer of organizersDB) {
      if (!organizer.creator) {
        handleAndLogError(
          new Error(
            `Не найден создатель (User) Организатора: "${organizer.name}" в БД!. Модуль getOrganizersService`
          )
        );
      }
    }
  }

  return organizersDB;
};

/**
 * Сервис добавления нового Организатора заезда
 */
export const postOrganizersService = async (
  name: string,
  shortName: string,
  creatorId: string
): Promise<{ message: string }> => {
  // Создание уникального названия для url.
  const urlSlug = slugify(name, { lower: true, strict: true });

  // Проверка на дубли.
  const [organizerCheckName, organizerCheckShortName, organizerCheckUrlSlug] =
    await Promise.all([
      Organizer.findOne({ name: name.toLowerCase() }).lean(),
      Organizer.findOne({ shortName }).collation({ locale: 'en', strength: 2 }).lean(),
      Organizer.findOne({ urlSlug }).lean(),
    ]);

  if (organizerCheckName) {
    throw new Error(`Название: "${name}" уже используется у другого организатора!`);
  }

  if (organizerCheckShortName) {
    throw new Error(
      `Короткое название: "${shortName}" уже используется у другого организатора!`
    );
  }

  if (organizerCheckUrlSlug) {
    throw new Error(
      `Произошла ошибка при генерации urlSlug, сформированная строка уже используется у другого организатора с названием: "${organizerCheckUrlSlug.name}". Попробуйте изменить название для создаваемого Организатора!`
    );
  }

  const response = await Organizer.create({
    name,
    shortName,
    creator: creatorId,
    urlSlug,
  });

  return { message: `Организатор ${response.name} добавлен в БД сайта` };
};

/**
 * Сервис удаления Организатора заездов.
 */
export const deleteOrganizersService = async (
  organizerId: string
): Promise<{ message: string }> => {
  const organizerDB = await Organizer.findOneAndDelete({ _id: organizerId }).lean<TOrganizer>();

  if (!organizerDB) {
    throw new Error(`Организатор ${organizerDB} не найден в БД`);
  }

  return { message: `Организатор ${organizerDB.name} удалён из БД сайта` };
};
