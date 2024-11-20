import { bans } from '../../assets/ban.js';
import { RiderBanned } from '../../Model/RidersBanned.js';
import { TResponseService } from '../../types/http.interface.js';
import { TBanCode } from '../../types/model.interface.js';

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
    await RiderBanned.updateOne(
      { zwiftId }, // Условие поиска
      { $set: { zwiftId, bannedReason, adminId } },
      { upsert: true } // Если запись не найдена, создаётся новая.
    );
  } else {
    // Если banned: false, удаляем из коллекции.
    await RiderBanned.deleteOne({ zwiftId });
  }

  const message = `${banned ? 'Забанен' : 'Разбанен'} райдер с zwiftId: ${zwiftId}`;
  return { data: null, message };
}
