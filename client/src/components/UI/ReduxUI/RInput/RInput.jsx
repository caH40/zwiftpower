import React from 'react';
import { useDispatch } from 'react-redux';

import useBlockParameters from '../../../../hook/useBlockParameters';

import styles from './RInput.module.css';

function RInput({ subgroupIndex, label, type, property, disabled }) {
  const dispatch = useDispatch();
  const { inputHandler, blockWithParameters } = useBlockParameters(subgroupIndex);

  return (
    <>
      <label className={styles.label}>
        {label || property}
        <input
          className={styles.input}
          type={type}
          value={blockWithParameters()[property]}
          onChange={(e) => {
            dispatch(inputHandler({ [property]: e.target.value, index: subgroupIndex }));
          }}
          disabled={disabled}
        />
      </label>
    </>
  );
}

export default RInput;
