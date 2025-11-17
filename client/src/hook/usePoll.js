import { useDispatch } from 'react-redux';

import { getAlert } from '../redux/features/alertMessageSlice';
import { fetchPostPollAnswers } from '../redux/features/api/poll/fetchPoll';

export function usePoll({ answers }) {
  const dispatch = useDispatch();

  const sendAnswers = async () => {
    try {
      if (answers.every((v) => v.checked === false)) {
        dispatch(
          getAlert({
            message: 'Необходимо выбрать хотя бы один вариант!',
            type: 'error',
            isOpened: true,
          })
        );
        return;
      }

      const response = await dispatch(fetchPostPollAnswers({ answers })).unwrap();

      dispatch(
        getAlert({
          message: response?.message || 'Успешно!',
          type: 'success',
          isOpened: true,
        })
      );
    } catch (error) {
      dispatch(
        getAlert({
          message: error?.message || 'Непредвиденная ошибка!',
          type: 'error',
          isOpened: true,
        })
      );
    }
  };

  return sendAnswers;
}
