import { myAxios } from '../axios';

/**
 * получение текущих Серий заездов, что бы выбрать Серию в которую добавляется Эвент
 */
export async function getSeriesActual() {
  try {
    const response = await myAxios.get('/api/series/actual');
    return response;
  } catch (error) {
    console.log(error); // eslint-disable-line
    throw error;
  }
}
