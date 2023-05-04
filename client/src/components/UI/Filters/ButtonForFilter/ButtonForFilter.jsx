import React from 'react';
import cn from 'classnames';

import styles from './ButtonForFilter.module.css';

function ButtonForFilter({ position, children, active }) {
  return (
    <button
      className={cn(styles.button, {
        [styles.button__center]: position === 'center',
        [styles.button__left]: position === 'left',
        [styles.button__right]: position === 'right',
        [styles.active]: active,
      })}
    >
      {children}
    </button>
  );
}

export default ButtonForFilter;
