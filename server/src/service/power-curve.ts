import { updateFitFileAndPowerCurve } from './updates/power-curve.js';

// types
import { TResponseService } from '../types/http.interface.js';

/**
 * Сервис добавления фитфайлов и данных из новых активностей райдера и обновление кривой мощности.
 */
export async function updateFitFileAndPowerCurveService({
  zwiftId,
}: {
  zwiftId: number;
}): Promise<TResponseService<null>> {
  // Добавление фитфайлов и данных из новых активностей.
  await updateFitFileAndPowerCurve({ zwiftId });

  return {
    data: null,
    message: `Обновлена кривая мощности для райдера с zwiftId:${zwiftId}!`,
  };
}
