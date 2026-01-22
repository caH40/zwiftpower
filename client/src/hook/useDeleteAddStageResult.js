import { useDispatch } from 'react-redux';

import { getAlert } from '../redux/features/alertMessageSlice';
import { fetchDeleteStageResultInSeries } from '../redux/features/api/series/fetchEditSeriesResults';
import { resetZwiftProfile } from '../redux/features/api/zwiftProfiles/zwiftProfileSlice';
import { fetchGetStageResults } from '../redux/features/api/series/fetchSeries';
import { closePopupFormContainer } from '../redux/features/popupFormContainerSlice';

export function useDeleteAddStageResult({
  setIsLoading,
  lastName,
  firstName,
  urlSlug,
  stageOrder,
}) {
  const dispatch = useDispatch();

  const deleteStageResult = async (resultId) => {
    const confirm = window.confirm(
      `Вы действительно ходите удалить результат райдера ${lastName} ${firstName}?`
    );

    if (!confirm) {
      dispatch(
        getAlert({ message: 'Отмена удаления результата', type: 'warning', isOpened: true })
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await dispatch(fetchDeleteStageResultInSeries({ resultId })).unwrap();

      // Успешный результат.
      dispatch(resetZwiftProfile());
      dispatch(getAlert({ message: response.message, type: 'success', isOpened: true }));
      dispatch(fetchGetStageResults({ urlSlug, stageOrder }));
      dispatch(closePopupFormContainer());
    } catch (error) {
      console.error(error); // eslint-disable-line
    } finally {
      setIsLoading(false);
    }
  };

  return deleteStageResult;
}
