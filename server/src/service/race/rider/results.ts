import { User } from '../../../Model/User.js';
import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';
import { ZwiftResult } from '../../../Model/ZwiftResult.js';
import { secondesToTime } from '../../../utils/date-convert.js';
import { addPropertyAddition } from '../../../utils/property-addition.js';
import { changeProfileData } from '../../profile-main.js';

// types
import { ZwiftEventSchema } from '../../../types/model.interface.js';

/**
 * Получение результатов райдера zwiftId и результатов с дополнительных профилей Звифт
 */
export async function getUserResultsFromDB(zwiftId: string) {
  const userDB = await User.findOne({ zwiftId });

  const zwiftIdAdditional: number[] = userDB ? userDB.zwiftIdAdditional : [];

  const resultsDB = await ZwiftResult.find({
    profileId: [zwiftId, ...zwiftIdAdditional],
  }).lean();

  // подмена данных профиля на Основной, если результат был показан Дополнительным профилем
  const results = changeProfileData(resultsDB);

  const resultsWithMaxValues = addPropertyAddition(results);
  for (const result of resultsWithMaxValues) {
    const zwiftEventDB: ZwiftEventSchema | null = await ZwiftEvent.findOne({
      id: result.eventId,
    });

    if (!zwiftEventDB) {
      continue;
    }

    const { name, eventStart } = zwiftEventDB;

    result.eventName = name;
    result.eventStart = new Date(eventStart).getTime();
  }

  // добавление строки времени в addition durationInMilliseconds
  for (const result of resultsWithMaxValues) {
    result.activityData.durationInMilliseconds.addition = secondesToTime(
      result.activityData.durationInMilliseconds.value
    );
  }
  // сортировка по дате старта заезда
  resultsWithMaxValues.sort((a, b) => {
    if (b.eventStart && a.eventStart) {
      return b.eventStart - a.eventStart;
    }
    return 0;
  });

  return resultsWithMaxValues;
}
