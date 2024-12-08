import { Organizer } from '../../Model/Organizer.js';
import { TResponseService } from '../../types/http.interface.js';

/**
 * Сервис получение данных Организатора по запросу модератора.
 */
export async function getClubZwiftModeratorService({
  organizerId,
}: {
  organizerId: string;
}): Promise<TResponseService<{ name: string }>> {
  // Получение данных организатора. Находится в разработке, поэтому запрашивается только название.
  const organizersDB = await Organizer.findOne(
    { _id: organizerId },
    { name: true, _id: false }
  ).lean<{ name: string }>();

  if (!organizersDB) {
    throw new Error(`Не найден запрашиваемый Организатор с _id:${organizerId}`);
  }

  return { data: organizersDB, message: 'Получены клубы запрашиваемого организатора.' };
}
