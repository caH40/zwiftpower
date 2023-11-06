import { changeRankResults } from './results-ranked.js';
import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftResult } from '../../Model/ZwiftResult.js';

// types
import { PutResultParams } from '../../types/types.interface.js';

/**
 * Обработка запроса на дисквалификацию(снятие дискв.) райдера
 */
export const setDisqualification = async ({
  userId,
  data,
  id,
  property,
}: PutResultParams): Promise<{ message: string }> => {
  // значение дисквалификации
  const isDisqualification = data.value === 'true' ? true : false;

  // внесение данных дисквалификации (или снятия дисквл.) в Результат райдера
  const resultDB = await ZwiftResult.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        isDisqualification,
        disqualificationDescription: isDisqualification ? data.message : null,
        disqualification: isDisqualification ? 'DSQ' : null,
      },
    },
    { new: true }
  );

  if (!resultDB) {
    throw new Error('Не найден результат');
  }

  // имя и фамилия райдера в Звифте (в текущем Эвенте)
  const rider = `${resultDB?.profileData.firstName} ${resultDB?.profileData.lastName}`;

  // внесение данных об модификации результата в Эвенте
  const eventDB = await ZwiftEvent.findByIdAndUpdate(resultDB.zwiftEventId, {
    $set: { 'modifiedResults.hasModified': true },
    $push: {
      'modifiedResults.moderators': {
        moderatorId: userId,
        date: Date.now(),
        action: {
          property,
          value: isDisqualification,
          rider,
          message: data.message,
        },
      },
    },
  });

  if (!eventDB) {
    throw new Error('Не найден Эвент для изменения ранкинга райдеров');
  }

  await changeRankResults(eventDB._id, eventDB.typeRaceCustom);

  if (resultDB.isDisqualification) {
    return { message: `Райдер ${rider} дисквалифицирован` };
  } else {
    return { message: `С райдера ${rider} снята дисквалификация` };
  }
};
