import React from 'react';

import MyTooltip from '../../../HOC/MyTooltip';

import styles from './SimpleCheckbox.module.css';

function SimpleCheckbox({ state, property, setState, title, tooltip, disabled }) {
  return (
    <MyTooltip tooltip={tooltip}>
      <label className={styles.label}>
        <input
          className={styles.input}
          checked={state[property]}
          type="checkbox"
          onChange={(e) => setState((prev) => ({ ...prev, [property]: e.target.checked }))}
          disabled={disabled}
        />
        <span>{title}</span>
      </label>
    </MyTooltip>
  );
}

export default SimpleCheckbox;
