import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getAlert } from '../redux/features/alertMessageSlice';
import {
  fetchDeleteSeriesOrganizer,
  fetchGetSeriesOrganizer,
} from '../redux/features/api/series/fetchSeries';

/**
 * Хук для работы с сериями заездов для Организатора.
 */
export const useSeriesTableListActions = ({ organizerId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Обработчик нажатия на иконку редактирования Серии.
  const editSeries = (seriesId) => {
    navigate(`/organizer/series/edit/${seriesId}`);
  };

  // Обработчик нажатия на иконку удаления Серии.
  const deleteSeries = async (seriesId, name) => {
    const confirmed = window.confirm(
      `Вы действительно хотите удалить Серию заездов с названием "${name}". Будут удалены все данные связанные с этой серии, кроме Этапов и результатов этих этапов.`
    );

    if (!confirmed) {
      dispatch(
        getAlert({ message: 'Отмена удаления серии!', type: 'warning', isOpened: true })
      );
      return;
    }

    try {
      const res = await dispatch(fetchDeleteSeriesOrganizer({ seriesId })).unwrap();

      await dispatch(fetchGetSeriesOrganizer({ organizerId })).unwrap();

      dispatch(
        getAlert({
          message: res.message || 'Неизвестная ошибка на сервере!',
          type: 'success',
          isOpened: true,
        })
      );
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };

  return { editSeries, deleteSeries };
};
