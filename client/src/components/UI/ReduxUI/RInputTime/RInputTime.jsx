import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setMainParams } from '../../../../redux/features/eventParamsSlice';
import { getDateTimeStart } from '../../../../utils/date-convert';

import styles from './RInputTime.module.css';

function RInputTime({ label, value, property, disabled }) {
  const [time, setTime] = useState(getDateTimeStart(value).time);
  const [date, setDate] = useState(getDateTimeStart(value).date);

  const dispatch = useDispatch();
  return (
    <>
      <label className={styles.label}>
        {label || property}
        <input
          className={styles.input}
          type={'date'}
          value={date}
          onChange={(e) => {
            const dateStr = `${e.target.value} ${time}`;
            setDate(e.target.value);
            dispatch(setMainParams({ [property]: new Date(dateStr).toISOString() }));
          }}
          disabled={disabled}
        />
        <input
          className={styles.input}
          type={'time'}
          value={time}
          onChange={(e) => {
            const dateStr = `${date} ${e.target.value}`;
            setTime(e.target.value);
            dispatch(setMainParams({ [property]: new Date(dateStr).toISOString() }));
          }}
          disabled={disabled}
        />
      </label>
    </>
  );
}

export default RInputTime;
