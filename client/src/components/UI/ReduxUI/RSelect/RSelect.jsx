import React from 'react';
import { useDispatch } from 'react-redux';

import { setMainParams } from '../../../../redux/features/eventParamsSlice';

import styles from './RSelect.module.css';

function RSelect({ label, value, property, disabled, options }) {
  const dispatch = useDispatch();
  return (
    <>
      <label className={styles.label}>{label || property}</label>
      <select
        className={styles.select}
        value={value || ''} // select не может быть null
        onChange={(e) => dispatch(setMainParams({ [property]: e.target.value }))}
        disabled={disabled}
      >
        <option className={styles.option} value=""></option>
        {options.map((element) => (
          <option className={styles.option} value={element.name} key={element.id}>
            {element.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default RSelect;
