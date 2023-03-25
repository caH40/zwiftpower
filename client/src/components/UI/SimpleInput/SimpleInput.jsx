import React from 'react';

import { handlerNewValue, handlerValue } from './service';

import styles from './SimpleInput.module.css';

function SimpleInput({
  name,
  state = {},
  setState,
  property,
  type,
  disabled,
  value,
  ...props
}) {
  const currentValue = value ? value : handlerValue(type, state[property]);
  return (
    <>
      {name ? <label className={styles.label}>{name}:</label> : undefined}
      <input
        className={styles.input}
        type={type}
        value={currentValue}
        onChange={(e) =>
          setState((prev) => ({ ...prev, [property]: handlerNewValue(type, e, currentValue) }))
        }
        disabled={disabled}
        {...props}
      />
    </>
  );
}

export default SimpleInput;
