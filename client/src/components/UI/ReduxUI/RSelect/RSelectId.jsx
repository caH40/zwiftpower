import React from 'react';
import { useDispatch } from 'react-redux';

import useBlockParameters from '../../../../hook/useBlockParameters';

import styles from './RSelect.module.css';

function RSelectId({ subgroupIndex, label, property, disabled, options }) {
  const dispatch = useDispatch();
  const { inputHandler, blockWithParameters } = useBlockParameters(subgroupIndex);

  return (
    <>
      <label className={styles.label}>{label || property}</label>
      <select
        className={styles.select}
        value={blockWithParameters()[property]} // select не может быть null
        onChange={(e) => {
          dispatch(inputHandler({ [property]: +e.target.value, index: subgroupIndex }));
        }}
        disabled={disabled}
      >
        <option className={styles.option} value=""></option>
        {options.map((element) => (
          <option className={styles.option} value={element.id} key={element.id}>
            {element.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default RSelectId;
