import TextareaAutosize from 'react-textarea-autosize';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import useBlockParameters from '../../../../hook/useBlockParameters';

import styles from './RTextarea.module.css';

function RTextarea({ subgroupIndex, label, property, placeholder, disabled }) {
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
      <label className={styles.label}>{label || property}</label>
      <TextareaAutosize
        className={styles.textarea}
        value={localValue}
        placeholder={placeholder}
        onChange={(e) => setLocalValue(e.target.value)}
        disabled={disabled}
        minRows={3}
      />
    </>
  );
}

export default RTextarea;
