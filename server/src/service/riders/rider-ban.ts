import { bans } from '../../assets/ban.js';
import { RiderBanned } from '../../Model/RidersBanned.js';
import { TResponseService } from '../../types/http.interface.js';
import { TBanCode, TRiderBanned } from '../../types/model.interface.js';

type TParamsUpdate = {
  zwiftId: number;
  banned: boolean;
  code: TBanCode;
  description?: string;
  adminId: string;
};

/**
 * Сервис для блокировки rider по zwiftId с глючными или читерскими данными.
 * !!! нет проверки типа code, что значения соответствуют TBanCode.
 */
export async function updateFairRideBanService({
  zwiftId,
  banned,
  code,
  description,
  adminId,
}: TParamsUpdate): Promise<TResponseService<null>> {
  if (banned) {
    const bannedReason = {
      code,
      description: description || bans.find((ban) => ban.code)?.description || 'нет описания',
    };
    // Если banned: true, добавляем в коллекцию
    await RiderBanned.create({ zwiftId, bannedReason, adminId });
  } else {
    // Если banned: false, удаляем из коллекции.
    await RiderBanned.deleteMany({ zwiftId, 'bannedReason.code': code });
  }

  const message = `${banned ? 'Забанен' : 'Разбанен'} райдер с zwiftId: ${zwiftId}`;
  return { data: null, message };
}
/**
 * Сервис получения баннов для райдера.
 */
export async function getFairRideBanService({
  zwiftId,
}: {
  zwiftId: number;
}): Promise<TResponseService<TRiderBanned[]>> {
  const response = await RiderBanned.find({ zwiftId }).lean<TRiderBanned[]>();

  const message = `Список баннов для райдера с zwiftId: ${zwiftId}`;
  return { data: response, message };
}
