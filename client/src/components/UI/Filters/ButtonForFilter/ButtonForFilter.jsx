import React from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import styles from './ButtonForFilter.module.css';

function ButtonForFilter({ position, children, active, reducer }) {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(reducer({ name: children, isActive: true }))}
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
