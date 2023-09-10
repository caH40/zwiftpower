import { getRequest } from '../zwift/request-get.js';

// types
import { GetResultsArg, ResultsEventAdditional } from '../../types/types.interface.js';

/**
 * Получение результатов заезда из Звифта
 */
export async function getResults({ subgroupObj, subgroupLabel = 'E' }: GetResultsArg) {
  let start = 0;
  let resultsQuantity = 50;
  const resultsSubgroup = [];

  while (resultsQuantity === 50) {
    const urlEventData = `race-results/entries?event_subgroup_id=${subgroupObj.subgroupId}&start=${start}&limit=50`;
    const eventData: ResultsEventAdditional = await getRequest(urlEventData);
    // добавление буквенного названия группы в каждый результат

    for (const entry of eventData.entries) {
      entry.subgroupLabel = subgroupLabel;
      entry.subgroupId = subgroupObj.subgroup_id; // id документа из  БД
    }
    resultsSubgroup.push(eventData);

    start += 50; // увеличение стартового номера запроса результатов
    resultsQuantity = eventData.entries.length;
  }
  const results = convertArrayOfResults(resultsSubgroup);
  return results;
}

function convertArrayOfResults(resultsSubgroup: ResultsEventAdditional[]) {
  const arrayConverted = [];
  for (const resultSubgroup of resultsSubgroup) {
    arrayConverted.push(...resultSubgroup.entries);
  }
  return arrayConverted;
}
