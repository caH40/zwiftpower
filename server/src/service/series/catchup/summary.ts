// types
import { ResultSeries, ResultSummaryCatchup } from '../../../types/types.interface.js';

/**
 * Получение сводной информации о победах за сезон
 */
export function getResultSummary(results: ResultSeries[]): ResultSummaryCatchup[] {
  let winsA = 0;
  let winsB = 0;
  let winsC = 0;
  let winsD = 0;
  let winsE = 0;

  // подсчет побед в заездах
  for (const result of results) {
    switch (result.subgroupLabel) {
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
      case 'D': {
        winsD++;
        break;
      }
      case 'E': {
        winsE++;
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
    { id: 3, groupCategory: 'D', winsTotal: winsD },
    { id: 4, groupCategory: 'E', winsTotal: winsE },
  ];
  resultSummary.sort((a, b) => b.winsTotal - a.winsTotal);

  return resultSummary;
}
