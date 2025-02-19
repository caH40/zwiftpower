import { FitFile } from '../Model/FitFile.js';
import { TResponseService } from '../types/http.interface.js';
import { FitFileSchema } from '../types/model.interface.js';

type ParamsPut = {
  _idActivity: string; // _id активности для обновления
  banned: boolean; // Значение для обновления свойства блокировки.
};

/**
 * Сервис установки/снятия блокировки (банна) с активности в фитфайле FileFile райдера.
 */
export async function putActivityInFitFileService({
  _idActivity,
  banned,
}: ParamsPut): Promise<TResponseService<null>> {
  const response = await FitFile.findOneAndUpdate(
    { 'activities._id': _idActivity },
    { $set: { 'activities.$.banned': banned } },
    { new: true }
  );

  if (!response) {
    throw new Error(`Не найдена активность с _id:${_idActivity}!`);
  }

  const message = `${
    banned ? 'Заблокирована' : 'Разблокирована'
  } активность с _id:${_idActivity} в фитфайлах!`;

  return { data: null, message };
}

/**
 * Сервис получения фитфайла активностей райдера.
 */
export async function getActivityInFitFileService({
  zwiftId,
}: {
  zwiftId: number;
}): Promise<TResponseService<FitFileSchema | null>> {
  try {
    const response = await FitFile.findOne(
      { zwiftId },
      { 'activities.powerInWatts': false }
    ).lean();

    if (!response) {
      return {
        data: null,
        message: `Не найден фитфайл с активностями райдера с zwiftId:${zwiftId}!`,
      };
    }

    // Сортировка активностей у убыванию даты.
    const activitiesSorted = response.activities.sort((a, b) => b.date - a.date);
    const fitfile = { ...response, activities: activitiesSorted };

    return {
      data: fitfile,
      message: `Фитфайл активностей райдера c zwiftId:${zwiftId}`,
    };
  } catch (error) {
    return {
      data: null,
      message: 'Произошла ошибка при получении данных',
    };
  }
}
