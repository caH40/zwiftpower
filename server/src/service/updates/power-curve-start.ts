import { PowerCurve } from '../../Model/PowerCurve.js';
import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { errorHandler } from '../../errors/error.js';

/**
 * Инициализация PowerCurve в БД для всех финишировавших райдеров
 * Модуль на случай потери PowerCurve, создаваемой при регистрации в Эвент
 */
export const initPowerCurve = async () => {
  const resultsDB = await ZwiftResult.find({}, { profileId: true });

  const zwiftIdUnique: Set<number> = new Set();
  for (const result of resultsDB) {
    zwiftIdUnique.add(result.profileId);
  }

  const resultsForDB = [...zwiftIdUnique].map((zwiftId) => ({
    zwiftId,
    date: 0,
    pointsWatts: [],
    pointsWattsPerKg: [],
  }));

  // will fail fast on the first error encountered. If false,
  // will insert all the documents it can and report errors later
  await PowerCurve.insertMany(resultsForDB, { ordered: false }).catch(
    (error) => errorHandler(error)
    // console.log(`Ошибка в initPowerCurve при insertMany, code=${error.code}`)
  );
};
