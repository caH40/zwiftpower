import { myAxios } from './axios';

export async function getSeries() {
  try {
    const response = await myAxios.get('/api/series');
    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}

export async function getSeriesActual() {
  try {
    const response = await myAxios.get('/api/series/actual');
    return response;
  } catch (error) {
    console.log(error); // eslint-disable-line
    throw error;
  }
}

export async function getSeriesOne(seriesId) {
  try {
    const response = await myAxios({
      url: '/api/seriesone',
      method: 'post',
      data: { seriesId },
    });
    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}

export async function putSeries(seriesChanged) {
  try {
    const response = await myAxios({
      url: '/api/series',
      method: 'put',
      data: {
        seriesChanged,
      },
    });
    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
export async function postSeries(seriesNew) {
  try {
    const response = await myAxios({
      url: '/api/series',
      method: 'post',
      data: {
        seriesNew,
      },
    });
    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
export async function postDeleteSeries(seriesId) {
  try {
    const response = await myAxios({
      url: '/api/series',
      method: 'delete',
      data: {
        seriesId,
      },
    });
    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
