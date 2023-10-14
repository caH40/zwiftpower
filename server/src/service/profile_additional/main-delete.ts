// types
import { ZwiftResult } from '../../Model/ZwiftResult.js';

/**
 * Удаление Основного профиля Zwift (данных) из результата Эвента,
 * который был показан дополнительным профилем Zwift
 * @param zwiftIdAdditional zwiftId дополнительного профиля Райдера из Звифт
 */
export const deleteMainProfileZwift = async (zwiftIdAdditional: number): Promise<void> => {
  await ZwiftResult.updateMany(
    { profileId: zwiftIdAdditional },
    { $unset: { profileDataMain: '' } }
  );
};
