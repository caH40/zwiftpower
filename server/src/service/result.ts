// types
import { ZwiftEvent } from '../Model/ZwiftEvent.js';
import { ZwiftResult } from '../Model/ZwiftResult.js';
import { PutResultParams } from '../types/types.interface.js';

/**
 * Сервис изменения результата Райдера
 */

export const putResultService = async ({
  userId,
  property,
  data,
  id,
}: PutResultParams): Promise<{ message: string }> => {
  switch (property) {
    case 'isDisqualification':
      return await setDisqualification({ userId, property, data, id });

    default:
      throw new Error('Не найден изменяемый параметр');
  }
};

/**
 * Обработка дисквалификации
 */
const setDisqualification = async ({
  userId,
  data,
  id,
  property,
}: PutResultParams): Promise<{ message: string }> => {
  // значение дисквалификации
  const isDisqualification = data.value === 'true' ? true : false;

  // внесение данных в Результат райдера
  const resultDB = await ZwiftResult.findOneAndUpdate(
    { _id: id },
    { $set: { isDisqualification, disqualification: data.message } },
    { new: true }
  );

  if (!resultDB) {
    throw new Error('Не найден результат');
  }

  // имя и фамилия райдера в Звифте (в текущем Эвенте)
  const rider = `${resultDB?.profileData.firstName} ${resultDB?.profileData.lastName}`;

  // внесение данных об модификации результата в Эвенте
  await ZwiftEvent.findByIdAndUpdate(
    resultDB.zwiftEventId,
    {
      $set: { 'modifiedResults.hasModified': true },
      $push: {
        'modifiedResults.moderators': {
          id: userId,
          date: Date.now(),
          action: {
            property,
            value: isDisqualification,
            rider,
            message: data.message,
          },
        },
      },
    },
    { new: true }
  );

  if (resultDB.isDisqualification) {
    return { message: `Райдер ${rider} дисквалифицирован` };
  } else {
    return { message: `С райдера ${rider} снята дисквалификация` };
  }
};
