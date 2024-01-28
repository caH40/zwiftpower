// checkbox-ы, создаваемые при итерации массива с правилами Эвента
import React from 'react';
import { useDispatch } from 'react-redux';

import MyTooltip from '../../../../HOC/MyTooltip';

import styles from './RCheckbox.module.css';

function RCheckboxArray({ reducer, label, value, property, tooltip, disabled }) {
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
        onChange={(e) => dispatch(reducer({ property, checked: e.target.checked }))}
        disabled={disabled}
      />
    </label>
  );
}

export default RCheckboxArray;
