import React from 'react';
import { useDispatch } from 'react-redux';

import { setMainParams } from '../../../../redux/features/eventParamsSlice';

import styles from './RInput.module.css';

function RInput({ label, value, type, property, disabled }) {
  const dispatch = useDispatch();
  return (
    <>
      <label className={styles.label}>{label || property}</label>
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={(e) => {
          dispatch(setMainParams({ [property]: e.target.value }));
        }}
        disabled={disabled}
      />
    </>
  );
}

export default RInput;
