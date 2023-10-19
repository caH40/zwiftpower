import { ResultEventAdditional } from '../../../../types/types.interface.js';
import { updatePowerCurve } from '../../../zwift/power_curve/power-curve-update.js';

// !!! пропускать обновление Кривой мощности айдеров, которые еще не финишировали,
// у которых нет FitFile за данный заезд
/**
 * Обновление PowerCurve райдера при обновлении результатов Эвента
 */
export const updatePowerCurveResults = async (
  results: ResultEventAdditional[]
): Promise<void> => {
  for (const result of results) {
    await updatePowerCurve(result.profileId);
  }
};
