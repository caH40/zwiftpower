import React from 'react';
import { useDispatch } from 'react-redux';

import { setSubgroupParams } from '../../../../redux/features/eventParamsSlice';

import styles from './RSelectObject.module.css';

// отображается name, значение используется id
function RSelectObject({ label, value, property, disabled, options, indexArray }) {
  const dispatch = useDispatch();

  const setValueSelected = (e) => {
    dispatch(
      setSubgroupParams({
        obj: { [property]: options.find((element) => element.name === e.target.value)?.id },
        index: indexArray,
      })
    );
  };
  return (
    <>
      <label className={styles.label}>{label || property}</label>
      <select
        className={styles.select}
        value={options.find((element) => element.id === value)?.name || ''}
        onChange={setValueSelected}
        placeholder={label}
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

export default RSelectObject;
