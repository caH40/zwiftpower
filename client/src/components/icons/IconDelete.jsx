import React from 'react';
import cn from 'classnames';

import { addClasses as cns } from '../../utils/additional-classes';
import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconDelete({ isActive, getClick, tooltip, addCls = ' ', squareSize = 20 }) {
  return (
    <MyTooltip tooltip={tooltip}>
      <div
        className={cn(styles.box, cns(styles, addCls))}
        onClick={getClick}
        style={{ width: squareSize, height: squareSize }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className={styles.alone__error}
            cx="12"
            cy="12"
            r="10.5"
            stroke="#CB0000"
            strokeWidth="3"
          />
          <line
            className={styles.alone__error}
            x1="6.94975"
            y1="6.94975"
            x2="16.8492"
            y2="16.8492"
            stroke="#CB0000"
            strokeWidth="2"
          />
          <line
            className={styles.alone__error}
            x1="6.94975"
            y1="16.8493"
            x2="16.8492"
            y2="6.94976"
            stroke="#CB0000"
            strokeWidth="2"
          />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconDelete;
