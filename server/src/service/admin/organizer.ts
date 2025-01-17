import slugify from 'slugify';

import { Organizer } from '../../Model/Organizer.js';
import { OrganizerSchema } from '../../types/model.interface.js';

/**
 * Сервис получения всех Организаторов заезда
 */
export const getOrganizersService = async (): Promise<OrganizerSchema[]> => {
  const organizersDB = await Organizer.find().populate('creator').lean();

  // Проверка на случай возможного удаления User из БД, который создавал Организатора.
  if (organizersDB.length) {
    for (const organizer of organizersDB) {
      if (!organizer.creator) {
        throw new Error(`Не найден создатель (User) Организатора: "${organizer.name}" в БД!`);
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
  label: string,
  creatorId: string
): Promise<{ message: string }> => {
  // Создание уникального названия для url.
  const urlSlug = slugify(name, { lower: true, strict: true });

  // Проверка на дубли.
  const [organizerCheckName, organizerCheckLabel, organizerCheckUrlSlug] = await Promise.all([
    Organizer.findOne({ name: name.toLowerCase() }).lean(),
    Organizer.findOne({ label: label.toLowerCase() }).lean(),
    Organizer.findOne({ urlSlug }).lean(),
  ]);

  if (organizerCheckName) {
    throw new Error(`Название: ${name} уже используется у другого организатора!`);
  }

  if (organizerCheckLabel) {
    throw new Error(`Лейбл: ${label} уже используется у другого организатора!`);
  }

  if (organizerCheckUrlSlug) {
    throw new Error(
      `Произошла ошибка при генерации urlSlug, сформированная строка уже используется у другого организатора с названием: ${organizerCheckUrlSlug.name}. Попробуйте изменить название для создаваемого Организатора!`
    );
  }

  const response = await Organizer.create({
    name,
    label,
    creator: creatorId,
    urlSlug,
  });

  return { message: `Организатор ${response.name} добавлен в БД сайта` };
};

/**
 * Сервис удаления Организатора заезда.
 */
export const deleteOrganizersService = async (
  organizerId: string
): Promise<{ message: string }> => {
  const organizerDB = await Organizer.findOneAndDelete({ _id: organizerId });

  if (!organizerDB) {
    throw new Error(`Организатор ${organizerDB} не найден в БД`);
  }

  return { message: `Организатор ${organizerDB.name} удалён из БД сайта` };
};
