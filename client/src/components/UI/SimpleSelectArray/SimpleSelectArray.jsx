import React from 'react';

import styles from './SimpleSelectArray.module.css';

function SimpleSelectArray({ name, state, setState, property, disabled, options }) {
  return (
    <>
      <p className={styles.label}>{name}:</p>
      <select
        className={styles.select}
        placeholder={name}
        value={options.find((option) => option.value === state[property])?.name || ''}
        onChange={(e) =>
          setState((prev) => ({
            ...prev,
            [property]: options.find((option) => option.name === e.target.value).value,
          }))
        }
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

export default SimpleSelectArray;
