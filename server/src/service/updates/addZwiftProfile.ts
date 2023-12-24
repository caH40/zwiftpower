import { ZwiftProfile } from '../../Model/ZwiftProfile.js';
import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { errorHandler } from '../../errors/error.js';
import { getZwiftRiderService } from '../zwift/rider.js';

/**
 * Добавление (обновление) данных Звифт-профайла райдеров,
 * участвовавших и финишировавших в заездах, которые есть в БД
 * Данные необходимы для использования в статистике, для оптимизации запросов на ZwiftAPI
 */
export const addZwiftProfile = async () => {
  try {
    const resultsDB: { profileId: number }[] = await ZwiftResult.find(
      {},
      { profileId: true, _id: false }
    ).lean();

    // получение уникальных райдеров
    const zwiftIds = new Set<number>();
    for (const result of resultsDB) {
      zwiftIds.add(result.profileId);
    }

    // добавление(обновление) данных профилей райдеров
    for (const zwiftId of zwiftIds) {
      const profile = await getZwiftRiderService(`${zwiftId}`).catch((error) =>
        errorHandler(error)
      );

      if (!profile) {
        continue;
      }

      await ZwiftProfile.findOneAndUpdate(
        { id: profile.id },
        { ...profile },
        { upsert: true }
      ).catch((error) => errorHandler(error));
    }
  } catch (error) {
    errorHandler(error);
  }
};
