import { myAxios } from '../axios';

export async function getSeriesActual() {
  try {
    const response = await myAxios.get('/api/series/actual');
    return response;
  } catch (error) {
    console.log(error); // eslint-disable-line
    throw error;
  }
}
