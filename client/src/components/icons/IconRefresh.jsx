import React from 'react';
import cn from 'classnames';

import { addClasses as cns } from '../../utils/additional-classes';
import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconRefresh({ getClick, tooltip, addCls = ' ' }) {
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
          <g clipPath="url(#clip0_341_2)">
            <path
              className={styles.alone__success}
              d="M3.9 8.4C5.25 5.25 8.4 3 12 3C16.5 3 20.1 6.3 20.85 10.5H23.85C23.1 4.65 18.15 0 12 0C7.5 0 3.6 2.4 1.65 6.15L0 4.5V10.5H6L3.9 8.4Z"
              fill="green"
            />
            <path
              className={styles.alone__success}
              d="M24 13.5H17.85L20.1 15.6C18.75 18.75 15.6 21 11.85 21C7.5 21 3.75 17.7 3 13.5H0C0.75 19.35 5.85 24 11.85 24C16.35 24 20.25 21.45 22.35 17.85L24 19.5V13.5Z"
              fill="green"
            />
          </g>
          <defs>
            <clipPath id="clip0_341_2">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconRefresh;
