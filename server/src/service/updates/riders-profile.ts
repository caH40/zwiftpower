import { Rider } from '../../Model/Rider.js';
import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { errorHandler } from '../../errors/error.js';
import { getZwiftRiderService } from '../zwift/rider.js';

// types
import { RiderProfileRanks } from '../../types/types.interface.js';

type ResultsDB = {
  profileId: number;
  rank: number;
  rankEvent: number;
};

/**
 * Добавление (обновление) данных Звифт-профайла всех райдеров,
 * участвовавших и финишировавших в заездах, которые есть в БД
 * Данные необходимы для использования в статистике, для оптимизации запросов на ZwiftAPI
 */
export const addRiderProfile = async () => {
  try {
    const resultsDB: ResultsDB[] = await ZwiftResult.find(
      {},
      { profileId: true, rank: true, rankEvent: true, _id: false }
    ).lean();

    // получение уникальных райдеров
    const zwiftProfiles = new Map<number, RiderProfileRanks>();
    for (const result of resultsDB) {
      const zwiftProfile = zwiftProfiles.get(result.profileId);

      if (zwiftProfile) {
        // изменение соответствующих счетчиков для текущего Райдера
        const medalsCurrent = zwiftProfile.medals;

        const totalEvents = zwiftProfile.totalEvents + 1;
        const medals = {
          gold: result.rankEvent === 1 ? medalsCurrent.gold + 1 : medalsCurrent.gold,
          silver: result.rankEvent === 2 ? medalsCurrent.silver + 1 : medalsCurrent.silver,
          bronze: result.rankEvent === 3 ? medalsCurrent.bronze + 1 : medalsCurrent.bronze,
        };

        zwiftProfiles.set(result.profileId, {
          totalEvents,
          medals,
        });
      } else {
        // если первое вхождение, то создаются пустые значения
        zwiftProfiles.set(result.profileId, {
          totalEvents: 1,
          medals: {
            gold: result.rankEvent === 1 ? 1 : 0,
            silver: result.rankEvent === 2 ? 1 : 0,
            bronze: result.rankEvent === 3 ? 1 : 0,
          },
        });
      }
    }

    // добавление(обновление) данных профилей райдеров
    for (const [keys, value] of zwiftProfiles) {
      const profile = await getZwiftRiderService(`${keys}`).catch((error) =>
        errorHandler(error)
      );

      if (!profile) {
        continue;
      }

      await Rider.findOneAndUpdate(
        { zwiftId: profile.id },
        { ...profile, ...value },
        { upsert: true }
      ).catch((error) => errorHandler(error));
    }
  } catch (error) {
    errorHandler(error);
  }
};
