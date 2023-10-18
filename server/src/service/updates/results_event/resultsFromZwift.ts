import { getResults } from '../../zwift/results.js';

// types
import { ZwiftEventSubgroupSchema } from '../../../types/model.interface.js';
import { ResultEventAdditional } from '../../../types/types.interface.js';

/**
 * Получение результатов заезда из ZwiftAPI
 * @param eventSubgroups массива данных подгрупп из Эвента
 * @returns массив результатов Райдеров из Эвента
 */
export const getResultsFromZwift = async (
  eventSubgroups: ZwiftEventSubgroupSchema[]
): Promise<ResultEventAdditional[]> => {
  const resultsTotal = [] as ResultEventAdditional[];

  for (const subgroup of eventSubgroups) {
    const subgroupObj = { subgroup_id: subgroup._id, subgroupId: subgroup.id };

    // запрос в ZwiftAPI
    const resultsSubgroup = await getResults({
      subgroupObj,
      subgroupLabel: subgroup.subgroupLabel,
    });
    resultsTotal.push(...resultsSubgroup);
  }

  return resultsTotal;
};
