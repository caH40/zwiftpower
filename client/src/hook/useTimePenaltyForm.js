import { useDispatch, useSelector } from 'react-redux';
import { useFieldArray } from 'react-hook-form';

import { getAlert } from '../redux/features/alertMessageSlice';
import { getTimerLocal } from '../utils/date-local';

/**
 * Массив штрафов.
 * Удаление штрафа по индексу.
 * Обработчик добавления штрафа.
 */
export function useTimePenaltyForm({ setError, getValues, setValue, control }) {
  const user = useSelector((state) => state.checkAuth.value.user);
  const dispatch = useDispatch();

  const {
    fields: timePenaltyFields,
    append: appendTimePenalty,
    remove: removeTimePenalty,
  } = useFieldArray({
    control,
    name: 'timePenalty', // корневой массив
  });

  const handleAddPenalty = () => {
    const { penaltySeconds, reason } = getValues();
    if (!reason) {
      setError('reason', { type: 'manual', message: ' ' });
    }

    if (!penaltySeconds) {
      setError('penaltySeconds', { type: 'manual', message: ' ' });
    }

    if (!penaltySeconds || !reason) {
      dispatch(
        getAlert({
          message: 'Заполните секунды и причину!',
          type: 'error',
          isOpened: true,
        })
      );
      return;
    }

    appendTimePenalty({
      reason,
      timeInMilliseconds: Number(penaltySeconds) * 1000,
      moderator: { username: user.username, _id: user.id },
      modifiedAt: new Date(),
    });

    // Очищаем только поля.
    setValue('penaltySeconds', '');
    setValue('reason', '');
  };

  const handleRemovePenalty = (penaltyId) => {
    removeTimePenalty(penaltyId);
  };

  return { timePenaltyFields, handleAddPenalty, handleRemovePenalty };
}
