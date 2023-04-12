import React from 'react';

import styles from './SelectObjectInArray.module.css';

function SelectObjectInArray({
  name,
  state,
  setState,
  property,
  disabled,
  options,
  index,
  arrayName,
}) {
  return (
    <>
      <p className={styles.label}>{name}:</p>
      <select
        className={styles.select}
        placeholder={name}
        value={
          options.find((element) => element.id === state[arrayName][index][property])?.name
        }
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

export default SelectObjectInArray;
