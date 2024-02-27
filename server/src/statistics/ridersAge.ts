import { Rider } from '../Model/Rider.js';
import { getAgeCategory } from '../utils/age.js';

// types
import { AgeCategories } from '../types/types.interface.js';

/**
 * Формирование данных по количеству райдеров в возрастных категориях
 */
export const getRidersTotalAgeService = async () => {
  const ridersDB: { age: number }[] = await Rider.find({}, { age: true, _id: false }).lean();

  const resultsMap = new Map([
    ['Senior', 0],
    ['Master', 0],
    ['Veteran', 0],
    ['50+', 0],
    ['60+', 0],
    ['', 0],
  ]);

  for (const profile of ridersDB) {
    const ageStr = getAgeCategory(profile.age);
    const currentCountAges = resultsMap.get(ageStr) || 0;
    resultsMap.set(ageStr, currentCountAges + 1);
  }

  const results = [] as AgeCategories[];
  for (const result of resultsMap) {
    results.push({ label: result[0], value: result[1] });
  }

  return results;
};
