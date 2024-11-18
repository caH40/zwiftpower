import { FitFile } from '../Model/FitFile.js';
import { User } from '../Model/User.js';
import { TResponseService } from '../types/http.interface.js';
import { FitFileSchema } from '../types/model.interface.js';

type ParamsPut = {
  _id: string; // _id активности для обновления
  banned: boolean; // Значение для обновления свойства блокировки.
};

/**
 * Сервис установки/снятия блокировки (банна) с активности в фитфайле FileFile райдера.
 */
export async function putActivityInFitFileService({
  _id,
  banned,
}: ParamsPut): Promise<TResponseService<null>> {
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

/**
 * Сервис получения фитфайла активностей райдера.
 */
export async function getActivityInFitFileService({
  _idUser,
}: {
  _idUser: string;
}): Promise<TResponseService<FitFileSchema | null>> {
  try {
    const userDB = await User.findOne({ _id: _idUser }, { _id: false, zwiftId: true }).lean<{
      zwiftId: number;
    }>();

    if (!userDB) {
      return {
        data: null,
        message: `Пользователь не найден с _id:${_idUser}!`,
      };
    }

    const response = await FitFile.findOne(
      { zwiftId: userDB.zwiftId },
      { 'activities.powerInWatts': false }
    ).lean();

    if (!response) {
      return {
        data: null,
        message: `Не найден фитфайл с активностями пользователя с zwiftId:${userDB.zwiftId}!`,
      };
    }

    return {
      data: response,
      message: `Фитфайл активностей пользователя _idUser:${_idUser} c zwiftId:${userDB.zwiftId}`,
    };
  } catch (error) {
    return {
      data: null,
      message: 'Произошла ошибка при получении данных',
    };
  }
}
