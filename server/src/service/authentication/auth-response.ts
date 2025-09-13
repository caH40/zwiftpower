import { Types } from 'mongoose';

import { Organizer } from '../../Model/Organizer.js';
import { Rider } from '../../Model/Rider.js';
import { TokenAuthModel } from '../../Model/TokenAuth.js';

// types
import { GenerateToken } from '../../types/auth.interface.js';
import { TDeviceInfo, TLocationInfo, UserSchema } from '../../types/model.interface.js';
import { generateToken } from './token.js';
import { millisecondsInWeekDays } from '../../assets/date.js';
import { TAuthService } from '../../types/types.interface.js';
import { dtoProfileDataForClient } from '../../dto/auth.js';
import { PeriodSubscriptionService } from '../PeriodSubscriptionService.js';
import { TeamMemberModel } from '../../Model/TeamMember.js';

type Params = {
  user: UserSchema;
  device: TDeviceInfo;
  location?: TLocationInfo;
  authService: TAuthService;
};

/**
 * Генерирует токены для пользователя, обновляет/создает запись в базе данных, формирует необходимые данные о пользователе, отправляемые на клиент.
 *
 * @param params - Параметры для генерации токенов.
 * @param params.user - Объект пользователя, включающий его ID.
 * @param params.device - Информация об устройстве, с которого выполняется аутентификация.
 * @param params.location - Информация о местоположении пользователя (опционально).
 *
 * @returns {Promise<Object>} Возвращает объект с данными пользователя для клиента и сгенерированными токенами.
 */
export async function generateAuthResponse({
  user,
  device,
  location,
  authService,
}: Params): Promise<{
  dataForClient: GenerateToken;
  tokensGenerated: { accessToken: string; refreshToken: string };
}> {
  // Создание объекта данных пользователя для отправки на клиент.
  const dataForClient = await createDataForClient({ user });

  // Генерируем accessToken и refreshToken.
  const tokensGenerated = generateToken(dataForClient);

  if (!tokensGenerated) {
    throw new Error('Ошибка при генерации пары JWT токенов!');
  }

  // Устанавливаем дату истечения токенов (7 дней).
  const expiresAt = new Date(Date.now() + millisecondsInWeekDays);

  // Обновляем или создаем запись токенов в базе данных.
  await TokenAuthModel.findOneAndUpdate(
    { userId: user._id, 'device.deviceId': device.deviceId },
    {
      userId: user._id,
      authService,
      tokens: tokensGenerated,
      device,
      location,
      expiresAt,
    },
    { upsert: true }
  );

  return { dataForClient, tokensGenerated };
}

/**
 * Создание объекта данных пользователя для отправки на клиент.
 */
export async function createDataForClient({
  user,
}: {
  user: UserSchema;
}): Promise<GenerateToken> {
  // Получение данных организатора для генерации новой пары токенов.

  // Получение лого райдера из коллекции Rider.

  const [organizerDB, riderDB, teamDB] = await Promise.all([
    Organizer.findOne({ creator: user._id }, { _id: true }).lean<{
      _id: Types.ObjectId;
    }>(),
    Rider.findOne({ zwiftId: user.zwiftId }, { _id: false, imageSrc: true }).lean<{
      imageSrc: string | null;
    }>(),
    TeamMemberModel.findOne({ user: user._id }, { team: true, _id: false }).lean<{
      team: Types.ObjectId;
    }>(),
  ]);

  // Проверка активной подписки у Организатора в клубах которых пользователь является модератором.
  const periodSubscription = new PeriodSubscriptionService();

  const clubs = user.moderator?.clubs;
  const activeClubs =
    clubs && (await periodSubscription.getClubsWithActiveOrganizerSubscription(clubs));

  // Данные для токенов и для возвращения клиенту.
  return dtoProfileDataForClient({
    user: { ...user, moderator: activeClubs && { clubs: activeClubs } },
    team: teamDB?.team,
    organizerId: organizerDB?._id,
    riderImg: riderDB?.imageSrc,
  });
}
