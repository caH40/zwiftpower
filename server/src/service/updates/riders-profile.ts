import pLimit from 'p-limit';

import { Rider } from '../../Model/Rider.js';
import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { errorHandler } from '../../errors/error.js';
import { getZwiftRiderService } from '../zwift/rider.js';

// types
import { RiderProfileRanks } from '../../types/types.interface.js';
import { ProfileZwiftAPI } from '../../types/zwiftAPI/profileFromZwift.interface.js';

type ResultsDB = {
  profileId: number;
  rank: number;
  rankEvent: number;
};

const concurrency = 50; // Количество параллельных запросов.
const limit = pLimit(concurrency);

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

    // Подсчет общего количества Эвентов и медалей для каждого райдера, участвовавшего в Заездах.
    const profilesWithRanks = calculateEventsAndMedals(resultsDB);

    const requestsProfiles = [...profilesWithRanks.keys()].map((profileId) =>
      limit(() =>
        getZwiftRiderService(profileId).catch((error) => {
          errorHandler(error);
          return null; // Возвращаем null вместо выброса ошибки.
        })
      )
    );

    // Массив данных профилей райдеров с Zwift API.
    const profiles = await Promise.all(requestsProfiles);

    // Фильтрация только успешных результатов.
    const profilesFiltered = profiles.filter(
      (profile) => profile !== null
    ) as ProfileZwiftAPI[];

    // Теперь можно продолжить работу с успешными профилями.
    const updatePromises = profilesFiltered.map((profile) =>
      Rider.findOneAndUpdate(
        { zwiftId: profile.id },
        { ...profile, ...profilesWithRanks.get(profile.id) },
        { upsert: true }
      ).catch((error) => errorHandler(error))
    );

    // Необходимо дождаться завершения всех асинхронных функций.
    await Promise.allSettled(updatePromises);
  } catch (error) {
    errorHandler(error);
  }
};

/**
 * Подсчет общего количества Эвентов и медалей для каждого райдера.
 */
function calculateEventsAndMedals(results: ResultsDB[]): Map<number, RiderProfileRanks> {
  const zwiftProfiles = new Map<number, RiderProfileRanks>();

  for (const result of results) {
    // Получаем данные объекта rank райдера или создаем новый, если его еще нет.
    const profileRank = zwiftProfiles.get(result.profileId) || {
      totalEvents: 0,
      medals: { gold: 0, silver: 0, bronze: 0 },
    };

    // Увеличиваем счетчики.
    profileRank.totalEvents++;
    profileRank.medals.gold += result.rankEvent === 1 ? 1 : 0;
    profileRank.medals.silver += result.rankEvent === 2 ? 1 : 0;
    profileRank.medals.bronze += result.rankEvent === 3 ? 1 : 0;

    // Сохраняем обновленные данные в мапу.
    zwiftProfiles.set(result.profileId, profileRank);
  }
  return zwiftProfiles;
}
