import React from 'react';

import styles from './ButtonForFilterCheckbox.module.css';

function ButtonForFilterCheckbox({ children, getClick }) {
  return (
    <button className={styles.button} onClick={getClick}>
      {children}
    </button>
  );
}

export default ButtonForFilterCheckbox;
