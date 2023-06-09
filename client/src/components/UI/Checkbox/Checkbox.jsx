import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import MyTooltip from '../../../HOC/MyTooltip';
import { getAlert } from '../../../redux/features/alertMessageSlice';

import styles from './Checkbox.module.css';

function Checkbox({ state, apiRequest, setUpdate, resultId, target, tooltip }) {
  const [check, setCheck] = useState(() => state);

  const dispatch = useDispatch();

  const changeValue = () => {
    setCheck((prev) => !prev);

    apiRequest(!check, resultId)
      .then((data) => {
        dispatch(getAlert({ message: data.data.message, type: 'success', isOpened: true }));
        setUpdate((prev) => !prev);
      })
      .catch((error) =>
        dispatch(
          getAlert({
            message: `Ошибка при изменении ${target}!`,
            type: 'error',
            isOpened: true,
          })
        )
      );
  };

  return (
    <MyTooltip tooltip={tooltip}>
      <input
        onChange={changeValue}
        checked={check}
        type="checkbox"
        id={`${target}-${resultId}`}
        className={styles.input}
      />
    </MyTooltip>
  );
}

export default Checkbox;
