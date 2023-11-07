import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import useBlockParameters from '../../../../hook/useBlockParameters';
import { getDateTimeStart } from '../../../../utils/date-local';

import styles from './RInputTime.module.css';

function RInputTime({ subgroupIndex, label, value, property, disabled }) {
  const [time, setTime] = useState(getDateTimeStart(value).time);
  const [date, setDate] = useState(getDateTimeStart(value).date);

  const dispatch = useDispatch();
  const { inputHandler } = useBlockParameters(subgroupIndex);

  return (
    <>
      <label className={styles.label}>
        {label || property}
        <input
          className={styles.input}
          type={'date'}
          value={date}
          onChange={(e) => {
            const dateStr = `${e.target.value || '01.01.2023'} ${time}`;
            setDate(e.target.value);
            dispatch(
              inputHandler({
                [property]: new Date(dateStr).toISOString(),
                index: subgroupIndex,
              })
            );
          }}
          disabled={disabled}
        />
        <input
          className={styles.input}
          type={'time'}
          value={time}
          step={1}
          onChange={(e) => {
            const dateStr = `${date} ${e.target.value || '00:00:00'}`;
            setTime(e.target.value);
            dispatch(
              inputHandler({
                [property]: new Date(dateStr).toISOString(),
                index: subgroupIndex,
              })
            );
          }}
          disabled={disabled}
        />
      </label>
    </>
  );
}

export default RInputTime;
