import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAlert } from '../../alertMessageSlice';

import { serverExpress } from '../../../../config/environment';

/**
 * Получение райдеров, участвовавших в заездах с сайта zwiftpower.ru
 */
export const fetchRiders = createAsyncThunk(
  'get/fetchRiders',
  async function ({ page, docsOnPage, search }, thunkAPI) {
    try {
      const pageStr = page ? `&page=${page}` : '';
      const docsOnPageStr = docsOnPage ? `&docsOnPage=${docsOnPage}` : '';
      const searchStr = search ? `&search=${search}` : '';

      const query = `${pageStr}${docsOnPageStr}${searchStr}`;
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
