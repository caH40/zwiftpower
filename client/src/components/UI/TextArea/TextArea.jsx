import React from 'react';

import styles from './TextArea.module.css';

function TextArea({ state, setState, name, property }) {
  return (
    <>
      {name ? <label className={styles.label}>{name}:</label> : undefined}
      <textarea
        value={state[property]}
        onChange={(e) => setState((prev) => ({ ...prev, [property]: e.target.value }))}
        className={styles.textarea}
      />
    </>
  );
}

export default TextArea;
