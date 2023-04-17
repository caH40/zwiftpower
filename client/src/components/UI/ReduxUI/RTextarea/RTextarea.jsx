import React from 'react';
import { useDispatch } from 'react-redux';

import styles from './RTextarea.module.css';

function RTextarea({ label, value, property, placeholder, disabled }) {
  const dispatch = useDispatch();
  return (
    <label className={styles.label}>
      {label || property}
      <textarea
        className={styles.textarea}
        value={value}
        placeholder={placeholder}
        onChange={(e) => dispatch({ [property]: e.target.value })}
        disabled={disabled}
      />
    </label>
  );
}

export default RTextarea;
