import pLimit from 'p-limit';

import { Rider } from '../../Model/Rider.js';
import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { errorHandler } from '../../errors/error.js';
import { getZwiftRiderService } from '../zwift/rider.js';

// types
import { RiderProfileRanks } from '../../types/types.interface.js';
import { ProfileZwiftAPI } from '../../types/zwiftAPI/profileFromZwift.interface.js';
import { User } from '../../Model/User.js';

type RiderIdsWithRank = {
  profileId: number;
  rank: number;
  rankEvent: number;
};

const concurrency = 50; // Количество параллельных запросов.
const limit = pLimit(concurrency);

/**
 * Обновление данных Звифт-профайла всех райдеров,
 * участвовавших и финишировавших в заездах, которые есть в БД
 * Данные Rider необходимы для использования в статистике, для оптимизации запросов на ZwiftAPI.
 */
export const updateAllRidersProfiles = async () => {
  try {
    const riderIdsWithRankDB = await ZwiftResult.find(
      {},
      { profileId: true, rank: true, rankEvent: true, _id: false }
    ).lean<RiderIdsWithRank[]>();

    // Массив zwiftId, которые привязаны к зарегистрированным профилям User.
    const riderIdsWithoutRankDB = await User.find(
      { zwiftId: { $exists: true } }, // Ищем документы без поля zwiftId
      { _id: false, zwiftId: true } // Выбираем только поле zwiftId
    ).lean<{ zwiftId: number }[]>();

    // Удаление zwiftId райдеров, которые есть в riderIdsWithRankDB,
    // то есть получаем массив с райдерами которые не участвовали ни в одном заезде.
    const riderIdsWithoutRankFiltered = riderIdsWithoutRankDB
      .map((rider) => ({
        profileId: rider.zwiftId,
        rank: 0,
        rankEvent: 0,
      }))
      .filter((rider) => !riderIdsWithRankDB.some((elm) => elm.profileId === rider.profileId));

    await updateRidersProfilesService([...riderIdsWithRankDB, ...riderIdsWithoutRankFiltered]);
  } catch (error) {
    errorHandler(error);
  }
};

/**
 * Обновление данных Звифт-профайла (коллекция Rider) райдеров, переданных во входном параметре.
 */
export const updateRidersProfiles = async (zwiftIds: number[]) => {
  try {
    const riderIdsWithRank = await ZwiftResult.find(
      { profileId: zwiftIds },
      { profileId: true, rank: true, rankEvent: true, _id: false }
    ).lean<RiderIdsWithRank[]>();

    // Если у всех райдеров из входного массива zwiftIds есть результаты.
    if (riderIdsWithRank.length === zwiftIds.length) {
      await updateRidersProfilesService(riderIdsWithRank);
    } else {
      // Поиск райдеров у которых нет результатов в БД.
      const ridersWithoutResults = zwiftIds.filter(
        (zwiftId) => !riderIdsWithRank.some((elm) => elm.profileId === zwiftId)
      );

      // Обновление/создание документов Rider для райдеров без результатов.
      await updateRidersProfilesWithoutResultsService(ridersWithoutResults);
    }
  } catch (error) {
    errorHandler(error);
  }
};

/**
 * Обновление данных Звифт-профайла (коллекция Rider) райдеров.
 */
async function updateRidersProfilesService(riderIdsWithRank: RiderIdsWithRank[]) {
  try {
    // Подсчет общего количества Эвентов и медалей для каждого райдера, участвовавшего в Заездах.
    const profilesWithRanks = calculateEventsAndMedals(riderIdsWithRank);

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
}

/**
 * Подсчет общего количества Эвентов и медалей для каждого райдера.
 */
function calculateEventsAndMedals(results: RiderIdsWithRank[]): Map<number, RiderProfileRanks> {
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

/**
 * Обновление(создание) данных Звифт-профайла (коллекция Rider) райдеров у которых нер результатов в БД сайта.
 */
async function updateRidersProfilesWithoutResultsService(zwiftIds: number[]) {
  try {
    const requestsProfiles = zwiftIds.map((zwiftId) =>
      limit(() =>
        getZwiftRiderService(zwiftId).catch((error) => {
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
      Rider.findOneAndUpdate({ zwiftId: profile.id }, { ...profile }, { upsert: true }).catch(
        (error) => errorHandler(error)
      )
    );

    // Необходимо дождаться завершения всех асинхронных функций.
    await Promise.allSettled(updatePromises);
  } catch (error) {
    errorHandler(error);
  }
}
