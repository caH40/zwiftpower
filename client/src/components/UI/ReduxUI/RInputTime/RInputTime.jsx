import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setMainParams, setSubgroupParams } from '../../../../redux/features/eventParamsSlice';
import { getDateTimeStart } from '../../../../utils/date-convert';

import styles from './RInputTime.module.css';

function RInputTime({ subgroupIndex, label, value, property, disabled }) {
  const [time, setTime] = useState(getDateTimeStart(value).time);
  const [date, setDate] = useState(getDateTimeStart(value).date);

  const {
    eventMainParams,
    eventSubgroup_0,
    eventSubgroup_1,
    eventSubgroup_2,
    eventSubgroup_3,
    eventSubgroup_4,
  } = useSelector((state) => state.eventParams);
  const dispatch = useDispatch();

  const inputHandler = subgroupIndex || subgroupIndex === 0 ? setSubgroupParams : setMainParams;

  /* eslint-disable */
  const blockWithParameters = () => {
    switch (subgroupIndex) {
      case 0:
        return eventSubgroup_0;
      case 1:
        return eventSubgroup_1;
      case 2:
        return eventSubgroup_2;
      case 3:
        return eventSubgroup_3;
      case 4:
        return eventSubgroup_4;
      default:
        return eventMainParams;
    }
  };
  /* eslint-enable */
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
          onChange={(e) => {
            const dateStr = `${date} ${e.target.value || '00:00'}`;
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
