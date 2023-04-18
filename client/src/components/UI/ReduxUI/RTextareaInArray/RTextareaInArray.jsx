import React from 'react';
import { useDispatch } from 'react-redux';

import { setSubgroupParams } from '../../../../redux/features/eventParamsSlice';

import styles from './RTextareaInArray.module.css';

function RTextareaInArray({ label, value, property, placeholder, disabled, indexArray }) {
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
      <textarea
        className={styles.textarea}
        value={value || ''}
        placeholder={placeholder}
        onChange={setValueSelected}
        disabled={disabled}
      />
    </>
  );
}

export default RTextareaInArray;
