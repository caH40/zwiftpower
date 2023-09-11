// types
import { TotalCatchupSchema } from '../../../types/model.interface.js';
import { ResultSeries } from '../../../types/types.interface.js';

/**
 * Получение сводной информации о победах за сезон
 */
export function getResultSummary(results: ResultSeries[], totalCatchup: TotalCatchupSchema) {
  let winsA = 0;
  let winsB = 0;
  let winsC = 0;

  // подсчет побед в заездах
  for (const result of results) {
    switch (result.eventSubgroup.subgroupLabel) {
      case 'A': {
        winsA++;
        break;
      }
      case 'B': {
        winsB++;
        break;
      }
      case 'C': {
        winsC++;
        break;
      }
      default: {
        break;
      }
    }
  }

  // подсчет побед в заездах, добавленных вручную
  for (const result of totalCatchup.manual) {
    switch (result.winnerCategory) {
      case 'A': {
        winsA++;
        break;
      }
      case 'B': {
        winsB++;
        break;
      }
      case 'C': {
        winsC++;
        break;
      }
      default: {
        break;
      }
    }
  }

  const resultSummary = [
    { id: 0, groupCategory: 'A', winsTotal: winsA },
    { id: 1, groupCategory: 'B', winsTotal: winsB },
    { id: 2, groupCategory: 'C', winsTotal: winsC },
  ];
  resultSummary.sort((a, b) => b.winsTotal - a.winsTotal);
  return resultSummary;
}
