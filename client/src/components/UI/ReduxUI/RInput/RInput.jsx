import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setMainParams, setSubgroupParams } from '../../../../redux/features/eventParamsSlice';

import styles from './RInput.module.css';

function RInput({ subgroupIndex, label, type, property, disabled }) {
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
          type={type}
          value={blockWithParameters()[property]}
          onChange={(e) => {
            dispatch(inputHandler({ [property]: e.target.value, index: subgroupIndex }));
          }}
          disabled={disabled}
        />
      </label>
    </>
  );
}

export default RInput;
