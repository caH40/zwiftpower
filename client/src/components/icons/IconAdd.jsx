import React from 'react';
import cn from 'classnames';

import { addClasses as cns } from '../../utils/additional-classes';
import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconAdd({ isActive, getClick, tooltip, addCls = ' ' }) {
  return (
    <MyTooltip tooltip={tooltip}>
      <div
        className={cn(styles.box, styles.box__alone, cns(styles, addCls))}
        onClick={getClick}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10.5" stroke="green" strokeWidth="3" />
          <line
            x1="11.8995"
            y1="4.89954"
            x2="11.8995"
            y2="18.8995"
            stroke="green"
            strokeWidth="2"
          />
          <line
            x1="4.89951"
            y1="11.8995"
            x2="18.8995"
            y2="11.8995"
            stroke="green"
            strokeWidth="2"
          />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconAdd;
