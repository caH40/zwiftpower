import React from 'react';

import styles from './SelectObject.module.css';

function SelectObject({ name, state, setState, property, disabled, options }) {
  return (
    <>
      <p className={styles.label}>{name}:</p>
      <select
        className={styles.select}
        placeholder={name}
        value={options.find((element) => element.id === state[property])?.name}
        onChange={(e) =>
          setState((prev) => ({
            ...prev,
            [property]: options.find((element) => element.name === e.target.value)?.id,
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

export default SelectObject;
