import { getAlert } from '../../alertMessageSlice';

/**
 * Обработчик ошибок для createAsyncThunk слайсов редакса.
 */
export function handlerErrorAsyncThunk({ error, thunkAPI }) {
  const message = error.response.data.message || error.message;
  thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));

  return thunkAPI.rejectWithValue(message);
}
