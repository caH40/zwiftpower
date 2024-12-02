import { generateAccessTokenZwift } from '../zwift/token.js';

//types
import { TResponseService } from '../../types/http.interface.js';
import { ZwiftToken } from '../../Model/ZwiftToken.js';

type Params = {
  organizerId: string;
  email: string;
  password: string;
  importance?: 'main' | 'secondary';
};

/**
 * Сервис добавления/редактирования данных бота-модератора для клубов в Звифте для Организатора.
 */
export async function putOrganizerBotZwiftService({
  organizerId,
  email,
  password,
  importance = 'main',
}: Params): Promise<TResponseService<null>> {
  // получение токена для API Zwift из БД
  const token = await generateAccessTokenZwift({
    email,
    password,
  });

  // Сохранение обновленного токена в БД.
  await ZwiftToken.findOneAndUpdate(
    { organizer: organizerId, importance },
    { $set: { organizerId, token, username: email } },
    { upsert: true }
  );

  return { data: null, message: 'Данные бота изменены!' };
}
