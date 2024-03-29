import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';
import { fetchResultEvent } from '../eventResultSlice';

/**
 * Запросы на изменение параметров результата Райдера
 * data : {_id, property,data: {value, message}
 */
export const fetchResultEdit = createAsyncThunk('results/resultPut', async (data, thunkAPI) => {
  try {
    const response = await myAxios({
      url: `${serverExpress}/api/race/result`,
      method: 'put',
      data: data,
    });

    // сообщение об удачном изменении параметра в результате Райдера
    thunkAPI.dispatch(
      getAlert({
        message: response.data.message,
        type: 'success',
        isOpened: true,
      })
    );

    // запрос данных с внесенными изменениями
    thunkAPI.dispatch(fetchResultEvent(response.data.eventId));

    return response.data;
  } catch (error) {
    const message = error.response.data.message || error.message;
    thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
    return thunkAPI.rejectWithValue(message);
  }
});
