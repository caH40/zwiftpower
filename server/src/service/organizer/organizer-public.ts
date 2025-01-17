import { Types } from 'mongoose';

import { Organizer } from '../../Model/Organizer.js';

// types
import { TResponseService } from '../../types/http.interface.js';
import { TOrganizer } from '../../types/model.interface.js';
import { organizerPublicDto, organizersPublicDto } from '../../dto/organizer.js';
import { TOrganizerPublicDto } from '../../types/types.interface.js';

/**
 * Сервис получение всех Организаторов.
 */
export async function getOrganizersPublicService(): Promise<
  TResponseService<TOrganizerPublicDto[]>
> {
  const organizersDB = await Organizer.find({ isActive: true }).lean<
    (TOrganizer & { _id: Types.ObjectId })[]
  >();

  const organizers = organizersPublicDto({ organizersFromDB: organizersDB });

  return { data: organizers, message: 'Организаторы заездов.' };
}

/**
 * Сервис получение данных Организатора.
 */
export async function getOrganizerPublicService({
  urlSlug,
}: {
  urlSlug: string;
}): Promise<TResponseService<TOrganizerPublicDto>> {
  const organizerDB = await Organizer.findOne({
    urlSlug: urlSlug.toLowerCase(),
    isPublished: true,
  }).lean<TOrganizer & { _id: Types.ObjectId }>();

  if (!organizerDB) {
    throw new Error(
      `Не найден запрашиваемый Организатор "${urlSlug}" или он закрыт показ своей страницы.`
    );
  }

  const organizer = organizerPublicDto({ organizerFromDB: organizerDB });

  return { data: organizer, message: `Данные запрашиваемого организатора ${organizer.name}` };
}
