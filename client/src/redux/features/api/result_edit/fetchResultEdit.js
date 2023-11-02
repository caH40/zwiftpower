import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

/**
 * Запросы на изменение параметров результата Райдера
 * data : {
 *           _id: ObjectId изменяемого результата,
 *           property название изменяемого параметра,
 *           value новое значение изменяемого параметра
 * }
 */
export const fetchResultEdit = createAsyncThunk('results/resultPut', async (data, thunkAPI) => {
  try {
    console.log(data);
    const response = await myAxios({
      url: `${serverExpress}/api/result/edit`,
      method: 'post',
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

    return response.data;
  } catch (error) {
    const message = error.response.data.message || error.message;
    thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
    return thunkAPI.rejectWithValue(message);
  }
});
