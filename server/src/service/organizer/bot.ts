import { ObjectId } from 'mongoose';

import { transformZwiftTokensToDto } from '../../dto/organizer.js';
import { generateAccessTokenZwift } from '../zwift/token.js';
import { ZwiftToken } from '../../Model/ZwiftToken.js';
import { Organizer } from '../../Model/Organizer.js';

//types
import { TResponseService } from '../../types/http.interface.js';
import { TOrganizer, TZwiftToken } from '../../types/model.interface.js';
import { TZwiftTokenDto } from '../../types/types.interface.js';

type ParamsPutOrganizerBot = {
  organizerId: string;
  email: string;
  password: string;
  importance?: 'main' | 'secondary';
};

type ParamsGetOrganizerBot = {
  creatorId: string;
};

/**
 * Сервис добавления/редактирования данных бота-модератора для клубов в Звифте для Организатора.
 */
export async function putOrganizerBotZwiftService({
  organizerId,
  email,
  password,
  importance = 'main',
}: ParamsPutOrganizerBot): Promise<TResponseService<null>> {
  // Получение токена для API Zwift из БД.
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

/**
 * Сервис получения данных token бота-модератора для клубов в Звифте для Организатора из БД.
 */
export async function getOrganizerBotZwiftService({
  creatorId,
}: ParamsGetOrganizerBot): Promise<TResponseService<TZwiftTokenDto[]>> {
  // Один пользователь может быть только одним организатором.
  const organizerDB = await Organizer.findOne({ creator: creatorId }).lean<
    TOrganizer & { _id: ObjectId }
  >();

  if (!organizerDB) {
    throw new Error(`У вашей учетной записи не найден Организатор!`);
  }

  // Получение токенов организатора.
  const zwiftTokensDB = await ZwiftToken.find(
    { organizer: organizerDB._id },
    { _id: false }
  ).lean<TZwiftToken[]>();

  // Подготовка данных для клиента.
  const tokens = transformZwiftTokensToDto(zwiftTokensDB);

  return { data: tokens, message: 'Токены организатора успешно получены!' };
}
