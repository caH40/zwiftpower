import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { getResultsCatchup } from '../preparation/catchup.js';
import { getResultsClassicCommon } from '../preparation/classic-common.js';
import { getResultsNewbies } from '../preparation/newbies.js';
import { getRequest } from '../zwift/request-get.js';

export async function getResults(subgroup, subgroupLabel = 'E', token) {
  try {
    let start = 0;
    let resultsQuantity = 50;
    const resultsSubgroup = [];

    while (resultsQuantity === 50) {
      const urlEventData = `race-results/entries?event_subgroup_id=${subgroup.subgroupId}&start=${start}&limit=50`;
      const eventData = await getRequest(urlEventData, token);
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
