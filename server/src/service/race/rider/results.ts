import { User } from '../../../Model/User.js';
import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';
import { ZwiftResult } from '../../../Model/ZwiftResult.js';
import { ZwiftResultSchema } from '../../../types/model.interface.js';
import { UserResult } from '../../../types/types.interface.js';
import { secondesToTime } from '../../../utils/date-convert.js';
import { addPropertyAddition } from '../../../utils/property-addition.js';
import { changeProfileData } from '../../profile-main.js';

type Arg = {
  zwiftId?: number;
  page?: number;
  docsOnPage?: number;
};

/**
 * Получение результатов райдера zwiftId и результатов с дополнительных профилей Звифт
 */
export async function getUserResultsService({ zwiftId, page = 1, docsOnPage = 20 }: Arg) {
  if (zwiftId === undefined) {
    return null;
  }

  const userDB = await User.findOne({ zwiftId });

  const zwiftIdAdditional: number[] = userDB ? userDB.zwiftIdAdditional : [];

  const resultsDB = await ZwiftResult.find({
    profileId: [zwiftId, ...zwiftIdAdditional],
  }).lean();

  const results = await handleRiderResults(resultsDB);

  // пагинация
  const quantityPages = Math.ceil(results.length / docsOnPage);
  const sliceStart = page * docsOnPage - docsOnPage;
  const sliceEnd = docsOnPage * page;
  const resultsSliced = results.slice(sliceStart, sliceEnd);

  return {
    userResults: resultsSliced,
    quantityPages,
    message: 'Результаты райдера',
  };
}

/**
 * Обработка результатов, добавление необходимых полей.
 */
export async function handleRiderResults(
  rawResults: ZwiftResultSchema[]
): Promise<UserResult[]> {
  // подмена данных профиля на Основной, если результат был показан Дополнительным профилем
  const results = changeProfileData(rawResults);

  const resultsWithMaxValues = addPropertyAddition(results);

  const zwiftEventsDB: { name: string; eventStart: string; id: number }[] =
    await ZwiftEvent.find(
      {
        id: resultsWithMaxValues.map((result) => result.eventId),
      },
      { name: true, eventStart: true, id: true, _id: false }
    );

  for (const result of resultsWithMaxValues) {
    const eventCurrent = zwiftEventsDB.find((elm) => result.eventId === elm.id);
    if (!eventCurrent) {
      continue;
    }
    result.eventName = eventCurrent?.name;
    result.eventStart = new Date(eventCurrent.eventStart).getTime();
  }

  // сортировка по дате старта заезда
  resultsWithMaxValues.sort((a, b) => {
    if (b.eventStart && a.eventStart) {
      return b.eventStart - a.eventStart;
    }
    return 0;
  });

  // добавление строки времени в addition durationInMilliseconds
  for (const result of resultsWithMaxValues) {
    result.activityData.durationInMilliseconds.addition = secondesToTime(
      result.activityData.durationInMilliseconds.value
    );
  }

  return resultsWithMaxValues;
}
