import React from 'react';
import { useDispatch } from 'react-redux';

import { putPenalty } from '../../../api/stage-penalty';
import { getAlert } from '../../../redux/features/alertMessageSlice';

import styles from './SelectPenalty.module.css';

const SelectPenalty = ({ result, value, setUpdate }) => {
  const dispatch = useDispatch();

  const changePenalty = (e) => {
    const newPenalty = Number(e.target.value);
    putPenalty(newPenalty, result._id)
      .then((data) => {
        dispatch(getAlert({ message: data.data.message, type: 'success', isOpened: true }));
        setUpdate((prev) => !prev);
      })
      .catch((error) =>
        dispatch(
          getAlert({ message: 'Ошибка при изменении штрафа!', type: 'error', isOpened: true })
        )
      );
  };

  return (
    <select
      onChange={changePenalty}
      name="penalty"
      size="1"
      value={value}
      className={`${styles.select} ${value === 0 ? '' : styles.hasPenalty}`}
    >
      <option value="0" label="нет" />
      <option className={styles.hasPenalty} value="1" label="1 PU" />
      <option className={styles.hasPenalty} value="2" label="2 PU" />
      <option className={styles.hasPenalty} value="3" label="3 PU" />
      <option className={styles.hasPenalty} value="4" label="4 PU" />
      <option className={styles.hasPenalty} value="5" label="5 PU" />
    </select>
  );
};

export default SelectPenalty;
