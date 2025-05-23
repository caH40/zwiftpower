import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAlert } from '../../alertMessageSlice';
import { myAxios } from '../../../../api/axios';
import { serverExpress } from '../../../../config/environment';

/**
 * Все Серии заездов Организатора.
 */
export const fetchGetSeriesOrganizer = createAsyncThunk(
  'seriesOrganizer/get',
  async (_, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/series`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * Серия заездов Организатора.
 */
export const fetchGetOneSeriesOrganizer = createAsyncThunk(
  'seriesOneOrganizer/get',
  async ({ seriesId }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/series/${seriesId}`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * Изменение данных Серии заездов Организатора.
 */
export const fetchPutSeriesOrganizer = createAsyncThunk(
  'seriesOrganizer/put',
  async (dataFromForm, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/series`,
        method: 'put',
        data: dataFromForm,
        headers: { 'Content-type': 'multipart/form-data' },
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * Создание Серии заездов Организатором.
 */
export const fetchPostSeriesOrganizer = createAsyncThunk(
  'seriesOrganizer/post',
  async (dataFromForm, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/series`,
        method: 'post',
        data: dataFromForm,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * Удаление Серии заездов Организатором.
 */
export const fetchDeleteSeriesOrganizer = createAsyncThunk(
  'seriesOrganizer/delete',
  async ({ seriesId }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/series`,
        method: 'delete',
        data: { seriesId },
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * Список Серий заездов, созданных Организатором, для публичных запросов.
 */
export const fetchGetSeries = createAsyncThunk(
  'nSeries/get',
  async (organizerSlug, thunkAPI) => {
    try {
      const url = new URL('/api/series/organizers', serverExpress);
      if (organizerSlug) {
        url.pathname += `/${organizerSlug}`;
      }

      const response = await myAxios({
        url: url.toString(),
        method: 'get',
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * Данные по серии заездов для публичных запросов.
 * options:
 */
export const fetchGetSeriesOne = createAsyncThunk(
  'nSeriesOne/get',
  async ({ urlSlug }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/series/${urlSlug}`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * Данные по этапам серии заездов для публичных запросов.
 */
export const fetchGetStages = createAsyncThunk(
  'stages/get',
  async ({ urlSlug, status }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/series/stages/${urlSlug}/${status}`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * Обновление результатов этапа серии заездов.
 */
export const fetchPutStageResults = createAsyncThunk(
  'nSeriesOneResults/put',
  async ({ seriesId, stageOrder }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/series/stage/results/`,
        method: 'put',
        data: { stageOrder, seriesId },
      });

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
  }
);

/**
 * Результаты этапа серии заездов для публичных запросов.
 */
export const fetchGetStageResults = createAsyncThunk(
  'nSeriesOneResults/get',
  async ({ urlSlug, stageOrder }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/series/stage/results/${urlSlug}/${stageOrder}`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * Добавление/удаление Этапа в Серию заездов.
 */
export const fetchUpdateSeriesStages = createAsyncThunk(
  'seriesOneStagesOrganizer/patch',
  async ({ stage, action, seriesId }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/series/stages`,
        method: 'patch',
        data: { stage, action, seriesId },
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * Изменение настроек этапа в Серии заездов.
 */
export const fetchUpdateSeriesStage = createAsyncThunk(
  'seriesOneStageOrganizer/patch',
  async ({ stage, seriesId }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/series/stage`,
        method: 'patch',
        data: { stage, seriesId },
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * Получение генеральной классификации серии заездов.
 */
export const fetchGeneralClassification = createAsyncThunk(
  'seriesGeneralClassification/get',
  async ({ urlSlug }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/series/general-classification/${urlSlug}`,
        method: 'get',
      });

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * Обновление генеральной классификации серии заездов.
 */
export const fetchUpdateGeneralClassification = createAsyncThunk(
  'seriesGeneralClassification/post',
  async ({ seriesId }, thunkAPI) => {
    try {
      const response = await myAxios({
        url: `${serverExpress}/api/organizer/series/results/general-classification`,
        method: 'post',
        data: { seriesId },
      });

      thunkAPI.dispatch(
        getAlert({ message: response.data.message, type: 'success', isOpened: true })
      );

      return response.data;
    } catch (error) {
      const message = error.response.data.message || error.message;
      thunkAPI.dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
