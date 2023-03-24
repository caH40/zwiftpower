import React from 'react';

import MyTooltip from '../../../HOC/MyTooltip';

import styles from './SimpleCheckbox.module.css';

const SimpleCheckbox = ({ state, property, setState, title, toolTip, disabled }) => {
  return (
    <MyTooltip toolTip={toolTip}>
      <label className={styles.label}>
        <span>{title}</span>
        <input
          className={styles.input}
          checked={state[property]}
          type="checkbox"
          onChange={e => setState(prev => ({ ...prev, [property]: e.target.checked }))}
          disabled={disabled}
        />
      </label>
    </MyTooltip>
  );
};

export default SimpleCheckbox;
