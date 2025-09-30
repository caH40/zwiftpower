import { useDispatch } from 'react-redux';

import { getAlert } from '../redux/features/alertMessageSlice';
import {
  fetchGeneralClassification,
  fetchGetStageResults,
  fetchPutStageResults,
  fetchUpdateGeneralClassification,
} from '../redux/features/api/series/fetchSeries';

/**
 * Функции для компоненты SeriesOneLayout.
 */
export function useSeriesOneFunctions() {
  const dispatch = useDispatch();

  // Функция обновления результатов этапа (order) серии заездов (seriesId).
  const updateStageResults = async ({ seriesId, stageOrder, urlSlug }) => {
    try {
      const isConfirm = window.confirm(
        `При обновлении результатов этапа №${stageOrder} сбросятся все изменения, внесённые в финишный протокол модераторами Серии. Вы действительно хотите обновить результаты этапа?`
      );

      if (!isConfirm) {
        dispatch(
          getAlert({
            message: `Отменена операция обновления результатов этапа №${stageOrder}`,
            type: 'warning',
            isOpened: true,
          })
        );
        return;
      }

      await dispatch(fetchPutStageResults({ seriesId, stageOrder })).unwrap();

      // После ответа fetchPutStageResults выполняется обновление результатов для соответствующего этапа.
      dispatch(fetchGetStageResults({ urlSlug, stageOrder }));
      dispatch(fetchGeneralClassification({ urlSlug }));
    } catch (error) {
      dispatch(
        getAlert({
          message: error,
          type: 'error',
          isOpened: true,
        })
      );
    }
  };

  // Функция обновления генеральной классификации серии заездов.
  const updateGeneralClassification = async ({ urlSlug, seriesId }) => {
    try {
      const isConfirm = window.confirm('Обновить Генеральную классификацию (ГК)?');

      if (!isConfirm) {
        dispatch(
          getAlert({
            message: 'Отменена операция обновления ГС',
            type: 'warning',
            isOpened: true,
          })
        );
        return;
      }

      await dispatch(fetchUpdateGeneralClassification({ seriesId })).unwrap();
      dispatch(fetchGeneralClassification({ urlSlug }));
    } catch (error) {
      dispatch(
        getAlert({
          message: error,
          type: 'error',
          isOpened: true,
        })
      );
    }
  };

  return { updateStageResults, updateGeneralClassification };
}
