import React from 'react';
import { useDispatch } from 'react-redux';

import { setSubgroupParams } from '../../../../redux/features/eventParamsSlice';

import styles from './RInputInArray.module.css';

function RInputInArray({ label, value, type, property, disabled, indexArray }) {
  const dispatch = useDispatch();

  const setValueSelected = (e) => {
    dispatch(
      setSubgroupParams({
        obj: { [property]: e.target.value },
        index: indexArray,
      })
    );
  };
  return (
    <>
      <label className={styles.label}>{label || property}</label>
      <input
        className={styles.input}
        type={type}
        value={value || ''}
        onChange={setValueSelected}
        disabled={disabled}
      />
    </>
  );
}

export default RInputInArray;
