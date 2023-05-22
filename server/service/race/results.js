import { User } from '../../Model/User.js';
import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { secondesToTime } from '../../utility/date-convert.js';
import { addPropertyAddition } from '../../utility/property-addition.js';
import { getResultsCatchup } from '../preparation/catchup.js';
import { getResultsClassicCommon } from '../preparation/classic-common.js';
import { getResultsNewbies } from '../preparation/newbies.js';
import { getRequest } from '../zwift/request-get.js';

// получение результатов заезда из Звифта
export async function getResults(subgroup, subgroupLabel = 'E') {
  try {
    let start = 0;
    let resultsQuantity = 50;
    const resultsSubgroup = [];

    while (resultsQuantity === 50) {
      const urlEventData = `race-results/entries?event_subgroup_id=${subgroup.subgroupId}&start=${start}&limit=50`;
      const eventData = await getRequest(urlEventData);
      // добавление буквенного названия группы в каждый результат
      eventData.entries.map((entry) => {
        entry.subgroupLabel = subgroupLabel;
        entry.subgroupId = subgroup.subgroup_id; // id документа из  БД
        return entry;
      });
      resultsSubgroup.push(eventData);

      start += 50; // увеличение стартового номера запроса результатов
      resultsQuantity = eventData.entries.length;
    }
    const results = convertArrayOfResults(resultsSubgroup);
    return results;
  } catch (error) {
    throw error;
  }
}

function convertArrayOfResults(resultsSubgroup) {
  const arrayConverted = [];
  for (const resultSubgroup of resultsSubgroup) {
    arrayConverted.push(...resultSubgroup.entries);
  }
  return arrayConverted;
}

export async function getResultsService(eventId) {
  try {
    const eventDB = await ZwiftEvent.findOne({ id: eventId }).populate('eventSubgroups');
    const event = eventDB.toObject();

    let eventPrepared = {};

    if (event.typeRaceCustom === 'catchUp') {
      eventPrepared = await getResultsCatchup(event);
    }
    if (event.typeRaceCustom === 'newbies') {
      eventPrepared = await getResultsNewbies(event);
    }
    if (event.typeRaceCustom === 'classicCommon') {
      eventPrepared = await getResultsClassicCommon(event);
    }

    return { event: eventPrepared, message: 'Результаты заезда' };
  } catch (error) {
    throw error;
  }
}

export async function getUserResultsService(zwiftId) {
  try {
    const resultsDB = await ZwiftResult.find({ profileId: zwiftId });
    const results = resultsDB.map((result) => result.toObject());

    const resultsWithMaxValues = addPropertyAddition(results);
    for (let result of resultsWithMaxValues) {
      const { name, eventStart } = await ZwiftEvent.findOne({
        id: result.eventId,
      });
      result.eventName = name;
      result.eventStart = new Date(eventStart).getTime();
    }

    // добавление строки времени в addition durationInMilliseconds
    for (const result of resultsWithMaxValues) {
      result.activityData.durationInMilliseconds.addition = secondesToTime(
        result.activityData.durationInMilliseconds.value
      );
    }

    resultsWithMaxValues.sort((a, b) => b.eventStart - a.eventStart);
    const userDB = await User.findOne({ zwiftId });

    return {
      userResults: resultsWithMaxValues,
      profile: userDB,
      message: 'Профайл и результаты райдера',
    };
  } catch (error) {
    throw error;
  }
}
