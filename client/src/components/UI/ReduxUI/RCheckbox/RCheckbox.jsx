import React from 'react';
import { useDispatch } from 'react-redux';

import MyTooltip from '../../../../HOC/MyTooltip';
import { setMainParams } from '../../../../redux/features/eventParamsSlice';

import styles from './RCheckbox.module.css';

function RCheckbox({ label, value, property, toolTip, disabled }) {
  const dispatch = useDispatch();
  return (
    <MyTooltip toolTip={toolTip}>
      <label className={styles.label}>
        <span>{label || property}</span>
        <input
          className={styles.input}
          checked={value}
          type="checkbox"
          onChange={(e) => dispatch(setMainParams({ [property]: e.target.checked }))}
          disabled={disabled}
        />
      </label>
    </MyTooltip>
  );
}

export default RCheckbox;
