import { categoriesForRankings } from '../../../assets/category.js';

// types
import { TStageResult } from '../../../types/model.interface.js';

/**
 * Общая функция для установки ранкинга в результатах
 */
export const setStageRank = (results: TStageResult[]): TStageResult[] => {
  const categories = { ...categoriesForRankings };

  return results.map((result) => {
    const currentCategory = result.modifiedCategory?.value ?? result.category;
    // Если у райдера, показавшему результат, нет категории или результат был дисквалифицирован.
    if (!currentCategory || result.disqualification) {
      // console.log('stageOrder', result.order);

      // console.log(currentCategory);
      // console.log(result.disqualification);

      // result.rank.category = 0;
      // result.rank.absolute = 0;
      // console.log(result.profileData.lastName, result.rank);
      // console.log('============================================');

      return result;
    }

    // Присвоение финишного места в категории и увеличение соответствующего счетчика.
    result.rank.category = categories[currentCategory] ?? 0;
    categories[currentCategory]++;

    // Присвоение финишного места в абсолюте и увеличение соответствующего счетчика.
    result.rank.absolute = categories['absolute'] ?? 0;
    categories['absolute']++;
    return result;
  });
};
