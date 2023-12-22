import { ResultWithEventAndSubgroup } from '../../../types/types.interface.js';

/**
 * Добавление стартовых гэпов
 */
export function addStartGaps(results: ResultWithEventAndSubgroup[]) {
  return results.map((result) => ({
    ...result,
    gaps: result.zwiftEventId.eventSubgroups.map((subgroup, index) => ({
      id: index,
      subgroupLabel: subgroup.subgroupLabel,
      gap:
        new Date(subgroup.eventSubgroupStart).getTime() -
        new Date(result.zwiftEventId.eventStart).getTime(),
    })),
  }));
}
