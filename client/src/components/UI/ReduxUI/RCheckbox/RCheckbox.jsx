import React from 'react';
import { useDispatch } from 'react-redux';

import MyTooltip from '../../../../HOC/MyTooltip';
import { setMainParams } from '../../../../redux/features/eventParamsSlice';

import styles from './RCheckbox.module.css';

function RCheckbox({ label, value, property, tooltip, disabled }) {
  const dispatch = useDispatch();
  return (
    <label className={styles.label}>
      <MyTooltip tooltip={tooltip}>
        <span>{label || property}</span>
      </MyTooltip>
      <input
        className={styles.input}
        checked={value}
        type="checkbox"
        onChange={(e) => dispatch(setMainParams({ [property]: e.target.checked }))}
        disabled={disabled}
      />
    </label>
  );
}

export default RCheckbox;
