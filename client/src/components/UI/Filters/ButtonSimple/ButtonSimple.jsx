import React from 'react';
import cn from 'classnames';

import { addClasses as cns } from '../../../../utils/additional-classes';

import styles from './ButtonSimple.module.css';

function ButtonSimple({ children, addCls = ' ', getClick }) {
  return (
    <button className={cn(styles.button, cns(styles, addCls))} onClick={getClick}>
      {children}
    </button>
  );
}

export default ButtonSimple;
