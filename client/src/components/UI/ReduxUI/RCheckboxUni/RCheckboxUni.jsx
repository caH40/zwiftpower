// checkbox для массива значений
import React from 'react';
import { useDispatch } from 'react-redux';

import MyTooltip from '../../../../HOC/MyTooltip';

import styles from './RCheckboxUni.module.css';

function RCheckboxUni({ reducer, label, values, property, tooltip, disabled }) {
  const dispatch = useDispatch();
  return (
    <MyTooltip tooltip={tooltip}>
      <label className={styles.label}>
        <input
          className={styles.input}
          checked={values.find((value) => value.nameInMenu === property).isVisible}
          type="checkbox"
          onChange={(e) =>
            dispatch(reducer({ nameInMenu: property, isVisible: e.target.checked }))
          }
          disabled={disabled}
        />
        <span>{label || property}</span>
      </label>
    </MyTooltip>
  );
}

export default RCheckboxUni;
