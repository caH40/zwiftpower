import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import useBlockParameters from '../../../../hook/useBlockParameters';

import styles from './RInput.module.css';

function RInput({ subgroupIndex, label, type, property, disabled }) {
  const dispatch = useDispatch();
  const { inputHandler, blockWithParameters } = useBlockParameters(subgroupIndex);

  // Получаем соответствующие параметр (эвента или подгрупп).
  const eventParam = blockWithParameters()[property];

  // Локальное состояние для быстрого ввода
  const [localValue, setLocalValue] = useState(eventParam || '');

  // Если данные в Redux поменялись извне — обновляем локальное состояние
  useEffect(() => {
    setLocalValue(eventParam || '');
  }, [eventParam]);

  // Дебаунс отправки в Redux.
  useEffect(() => {
    const id = setTimeout(() => {
      if (eventParam !== localValue) {
        dispatch(inputHandler({ [property]: localValue, index: subgroupIndex }));
      }
    }, 300);

    return () => clearTimeout(id);
  }, [localValue, eventParam, property, subgroupIndex, dispatch, inputHandler]);

  return (
    <>
      <label className={styles.label}>
        {label || property}
        <input
          className={styles.input}
          type={type}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          disabled={disabled}
        />
      </label>
    </>
  );
}

export default RInput;
