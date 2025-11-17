import { useDispatch } from 'react-redux';

import { getAlert } from '../redux/features/alertMessageSlice';
import { fetchPostPollAnswers } from '../redux/features/api/poll/fetchPoll';

export function usePoll({ selectedOptionIds, pollId }) {
  const dispatch = useDispatch();

  const sendAnswers = async () => {
    try {
      if (selectedOptionIds.length === 0) {
        dispatch(
          getAlert({
            message: 'Необходимо выбрать хотя бы один вариант!',
            type: 'error',
            isOpened: true,
          })
        );
        return;
      }

      const response = await dispatch(
        fetchPostPollAnswers({ selectedOptionIds, pollId })
      ).unwrap();

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
          message: error?.response?.data?.message || error?.message || 'Непредвиденная ошибка!',
          type: 'error',
          isOpened: true,
        })
      );
    }
  };

  return sendAnswers;
}
// const sendAnswers = async () => {
//     try {
//       if (selectedOptionIds.length === 0) {
//         dispatch(
//           getAlert({
//             message: 'Необходимо выбрать хотя бы один вариант!',
//             type: 'error',
//             isOpened: true,
//           })
//         );
//         return;
//       }

//       const response = await dispatch(
//         fetchPostPollAnswers({ selectedOptionIds, pollId })
//       ).unwrap();

//       dispatch(
//         getAlert({
//           message: response?.message || 'Успешно!',
//           type: 'success',
//           isOpened: true,
//         })
//       );
//     } catch (error) {
//       dispatch(
//         getAlert({
//           message: error?.response?.data?.message || error?.message || 'Непредвиденная ошибка!',
//           type: 'error',
//           isOpened: true,
//         })
//       );
//     }
//   };
