import React from 'react';
import { useDispatch } from 'react-redux';

import useBlockParameters from '../../../../hook/useBlockParameters';

import styles from './RTextarea.module.css';

function RTextarea({ subgroupIndex, label, value, property, placeholder, disabled }) {
  const dispatch = useDispatch();
  const { inputHandler, blockWithParameters } = useBlockParameters(subgroupIndex);

  return (
    <>
      <label className={styles.label}>{label || property}</label>
      <textarea
        className={styles.textarea}
        value={blockWithParameters()[property] || ''}
        placeholder={placeholder}
        onChange={(e) =>
          dispatch(inputHandler({ [property]: e.target.value, index: subgroupIndex }))
        }
        disabled={disabled}
      />
    </>
  );
}

export default RTextarea;
