import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAlert } from '../../alertMessageSlice';

import { serverExpress } from '../../../../config/environment';

/**
 * Получение райдеров, участвовавших в заездах с сайта zwiftpower.ru
 */
export const fetchRiders = createAsyncThunk(
  'get/fetchRiders',
  async function ({ page, docsOnPage, search, columnName, isRasing, category }, thunkAPI) {
    try {
      const query = getSearchParams({
        page,
        docsOnPage,
        search,
        columnName,
        isRasing,
        category,
      });
      const response = await axios({
        url: `${serverExpress}/api/riders?${query}`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

// Соответствие названий колонок в таблице к названием свойств в БД.
const columns = {
  Райдер: 'firstName',
  Финиш: 'totalEvents',
  'Рейтинговые очки': 'competitionMetrics.racingScore',
  60: 60,
  300: 300,
  1200: 600,
  2400: 2400,
};

/**
 * Создание query запроса.
 */
function getSearchParams({ page, docsOnPage, search, columnName, isRasing, category }) {
  const params = new URLSearchParams();

  if (page) {
    params.append('page', page);
  }
  if (docsOnPage) {
    params.append('docsOnPage', docsOnPage);
  }
  if (search) {
    params.append('search', search);
  }
  const columnNameFormatted = columns[columnName];
  if (columnNameFormatted) {
    params.append('columnName', columnNameFormatted);
  }
  if (typeof isRasing !== 'undefined') {
    params.append('isRasing', isRasing);
  }
  if (category) {
    params.append('category', category);
  }

  return params.toString(); // Преобразуем параметры в строку.
}
