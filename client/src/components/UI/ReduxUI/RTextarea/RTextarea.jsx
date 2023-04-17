import React from 'react';
import { useDispatch } from 'react-redux';

import { setMainParams } from '../../../../redux/features/eventParamsSlice';

import styles from './RTextarea.module.css';

function RTextarea({ label, value, property, placeholder, disabled }) {
  const dispatch = useDispatch();
  return (
    <>
      <label className={styles.label}>{label || property}</label>
      <textarea
        className={styles.textarea}
        value={value}
        placeholder={placeholder}
        onChange={(e) => dispatch(setMainParams({ [property]: e.target.value }))}
        disabled={disabled}
      />
    </>
  );
}

export default RTextarea;
