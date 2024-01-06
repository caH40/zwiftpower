import { errorHandler } from '../../../errors/error.js';

// types
import { ResultEventAdditional } from '../../../types/types.interface.js';

/**
 * Добавление VI (Variability Index) (мутация) индекса вариабельности в результаты при обновлении результатов Эвента
 * Необходимо что бы NP уже были в результатах райдеров в БД
 */
export const addVariabilityIndex = async (results: ResultEventAdditional[]) => {
  try {
    for (const result of results) {
      if (!result.normalizedPower) {
        result.variabilityIndex = 1;
        continue;
      }

      // variabilityIndex = normalizedPower / averagePower
      result.variabilityIndex =
        Math.round((100 * result.normalizedPower) / result.sensorData.avgWatts) / 100;
    }
  } catch (error) {
    errorHandler(error);
  }
};
