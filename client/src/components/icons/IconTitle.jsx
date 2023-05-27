import React from 'react';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconTitle({ squareSize = 24, tooltip }) {
  return (
    <MyTooltip tooltip={tooltip}>
      <div className={styles.box__rules} style={{ width: squareSize, height: squareSize }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="1" y="4" width="22" height="15" rx="1" stroke="black" strokeWidth="2" />
          <rect x="4" y="7" width="5" height="5" fill="black" />
          <line x1="11" y1="8" x2="20" y2="8" stroke="black" strokeWidth="2" />
          <line x1="11" y1="11" x2="20" y2="11" stroke="black" strokeWidth="2" />
          <line x1="4" y1="15" x2="20" y2="15" stroke="black" strokeWidth="2" />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconTitle;
