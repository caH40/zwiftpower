import { FitFile } from '../Model/FitFile.js';
import { TResponseService } from '../types/http.interface.js';

type Params = {
  _id: string; // _id активности для обновления
  banned: boolean; // Значение для обновления свойства блокировки.
};

/**
 * Сервис установки/снятия блокировки (банна) с активности в фитфайле FileFile райдера.
 */
export async function putActivityInFitFileService({
  _id,
  banned,
}: Params): Promise<TResponseService<null>> {
  const response = await FitFile.findOneAndUpdate(
    { 'activities._id': _id },
    { $set: { 'activities.$.banned': banned } },
    { new: true }
  );

  if (!response) {
    throw new Error(`Активность не найдена с _id:${_id}!`);
  }

  const message = `Активность с _id:${_id} в фитфайлах ${
    banned ? 'заблокирована' : 'разблокирована'
  }`;

  return { data: null, message };
}
