import { Organizer } from '../../Model/Organizer.js';
import { OrganizerSchema } from '../../types/model.interface.js';

/**
 * Сервис получения всех Организаторов заезда
 */
export const getOrganizersService = async (): Promise<OrganizerSchema[]> => {
  const organizersDB = await Organizer.find().populate('creator').lean();

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
  const response = await Organizer.create({
    name,
    label,
    creator: creatorId,
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
