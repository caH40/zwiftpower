import React from 'react';
import cn from 'classnames';

import { addClasses as cns } from '../../../utils/additional-classes.js';
import MyTooltip from '../../../HOC/MyTooltip.jsx';

import styles from './Button.module.css';

function Button({ getClick, children, addCls = '', toolTip, disabled, ...props }) {
  const getClickPreventDefault = (e) => {
    e.preventDefault();
    getClick();
  };

  return (
    <MyTooltip toolTip={toolTip} disabled={disabled}>
      <button
        className={cn(styles.button, cns(styles, addCls))}
        onClick={getClick ? getClickPreventDefault : undefined}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    </MyTooltip>
  );
}

export default Button;
