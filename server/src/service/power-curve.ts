import { User } from '../Model/User.js';
import { updateFitFileAndPowerCurve } from './updates/power-curve.js';

// types
import { TResponseService } from '../types/http.interface.js';

/**
 * Сервис добавления фитфайлов и данных из новых активностей райдера и обновление кривой мощности.
 */
export async function updateFitFileAndPowerCurveService({
  _idUser,
}: {
  _idUser: string;
}): Promise<TResponseService<null>> {
  const userDB = await User.findOne({ _id: _idUser }, { _id: false, zwiftId: true }).lean<{
    zwiftId: number;
  }>();

  if (!userDB) {
    throw new Error(`Не найден пользователь с _id:${_idUser}`);
  }

  // Добавление фитфайлов и данных из новых активностей.
  await updateFitFileAndPowerCurve({ zwiftId: userDB.zwiftId });

  return {
    data: null,
    message: `Обновлена кривая мощности для райдера с zwiftId:${userDB.zwiftId}!`,
  };
}
