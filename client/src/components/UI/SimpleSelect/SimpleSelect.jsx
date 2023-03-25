import React from 'react';

import styles from './SimpleSelect.module.css';

const SimpleSelect = ({ name, state, setState, property, disabled, options }) => {
  return (
    <>
      <p className={styles.label}>{name}:</p>
      <select
        className={styles.select}
        placeholder={name}
        value={state[property]}
        onChange={(e) => setState((prev) => ({ ...prev, [property]: e.target.value }))}
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
};

export default SimpleSelect;
